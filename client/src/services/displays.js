const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const EMPLOYEES_API_URL = `${API_BASE_URL}/api/employees`
const DEPARTMENTS_API_URL = `${API_BASE_URL}/api/departments`
const ROLES_API_URL = `${API_BASE_URL}/api/roles`

const logErrorResponse = async (response) => {
  const errorText = await response.text()
  console.error('Error response:', errorText)
}

export const fetchEmployees = async () => {
  try {
    const response = await fetch(EMPLOYEES_API_URL)
    if (!response.ok) {
      await logErrorResponse(response)
      throw new Error('Failed to fetch employees')
    }
    return response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export const fetchRoles = async () => {
  try {
    const response = await fetch(ROLES_API_URL)
    if (!response.ok) {
      await logErrorResponse(response)
      throw new Error('Failed to fetch roles')
    }
    return response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export const fetchDepartments = async () => {
  try {
    const response = await fetch(DEPARTMENTS_API_URL)
    if (!response.ok) {
      await logErrorResponse(response)
      throw new Error('Failed to fetch departments')
    }
    return response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

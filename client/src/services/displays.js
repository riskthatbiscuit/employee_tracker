// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const API_BASE_URL = 'https://infinite-waters-93089-7bd83e9457e8.herokuapp.com'
console.log('API_BASE_URL:', API_BASE_URL)

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
    const data = await response.json()
    return data
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

export const fetchEmployee = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/employees/${id}`)
    if (!response.ok) {
      await logErrorResponse(response)
      throw new Error('Failed to fetch employee')
    }
    return response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export const fetchManagedEmployees = async (id) => {
  try {
    console.log(`Fetching employees managed by ${id}`)
    const response = await fetch(`${API_BASE_URL}/api/employees/managed-by/${id}`)
    if (!response.ok) {
      await logErrorResponse(response)
      throw new Error('Failed to fetch managed employees')
    }
    return response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
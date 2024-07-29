const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const EMPLOYEES_API_URL = `${API_BASE_URL}/api/employees`
const DEPARTMENTS_API_URL = `${API_BASE_URL}/api/departments`
const ROLES_API_URL = `${API_BASE_URL}/api/roles`

export const fetchEmployees = async () => {
  const response = await fetch(EMPLOYEES_API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch employees')
  }
  return response.json()
}

export const fetchRoles = async () => {
  const response = await fetch(ROLES_API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch roles')
  }
  return response.json()
}

export const fetchDepartments = async () => {
  const response = await fetch(DEPARTMENTS_API_URL)
  if (!response.ok) {
    throw new Error('Failed to fetch departments')
  }
  return response.json()
}

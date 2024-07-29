const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const EMPLOYEES_API_URL = `${API_BASE_URL}/api/employees`
const DEPARTMENTS_API_URL = `${API_BASE_URL}/api/departments`
const ROLES_API_URL = `${API_BASE_URL}/api/roles`


export const addEmployee = async (employeeData) => {
  console.log(employeeData)
  const response = await fetch(EMPLOYEES_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  })

  if (!response.ok) {
    throw new Error('Failed to add employee')
  }

  return response.json()
}

export const addDepartment = async (departmentData) => {
  console.log(departmentData)
  const response = await fetch(DEPARTMENTS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(departmentData),
  })

  if (!response.ok) {
    throw new Error('Failed to add department')
  }

  return response.json()
}

export const addRole = async (roleData) => {
  console.log(roleData)
  const response = await fetch(ROLES_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roleData),
  })

  if (!response.ok) {
    throw new Error('Failed to add role')
  }

  return response.json()
}

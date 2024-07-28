const EMPLOYEES_API_URL = 'http://localhost:3001/api/employees';
const DEPARTMENTS_API_URL = 'http://localhost:3001/api/departments';
const ROLES_API_URL = 'http://localhost:3001/api/roles';

export const deleteDepartment = async (id) => {
  const response = await fetch(`${DEPARTMENTS_API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete department');
  }

  return response.json();
}

export const deleteRole = async (id) => {
  console.log(`Role ID: ${id}`);
  const response = await fetch(`${ROLES_API_URL}/${id}`, {
    method: 'DELETE',
  });
  console.log(response);
  if (!response.ok) {
    throw new Error('Failed to delete role');
  }
  return response.json();
}

export const deleteEmployee = async (id) => {
  const response = await fetch(`${EMPLOYEES_API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete employee');
  }

  return response.json();
}
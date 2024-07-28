const EMPLOYEES_API_URL = 'http://localhost:3001/api/employees';
const ROLES_API_URL = 'http://localhost:3001/api/roles';
const DEPARTMENTS_API_URL = 'http://localhost:3001/api/departments';

export const fetchEmployees = async () => {
  const response = await fetch(EMPLOYEES_API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json();
};

export const fetchRoles = async () => {
  const response = await fetch(ROLES_API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch roles');
  }
  return response.json();
};

export const fetchDepartments = async () => {
  const response = await fetch(DEPARTMENTS_API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch departments');
  }
  return response.json();
};
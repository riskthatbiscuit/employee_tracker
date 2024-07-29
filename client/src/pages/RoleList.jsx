import React, { useState, useEffect } from 'react'
import { fetchEmployees, fetchRoles, fetchDepartments } from '../services/displays'
import { addRole } from '../services/additions'
import { deleteRole } from '../services/deletions'
import { useForm } from 'react-hook-form'

const RoleList = () => {
  const { register, handleSubmit, reset } = useForm()
  const [roles, setRoles] = useState([])
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [debugInfo, setDebugInfo] = useState({
    roles: null,
    departments: null,
  })

  const getDepartments = async () => {
    try {
      const data = await fetchDepartments()
      setDepartments(data)
      setDebugInfo((prev) => ({ ...prev, departments: data }))
    } catch (err) {
      setError(err.message)
    }
  }

useEffect(() => {
  const fetchData = async () => {
    try {
      const employeesData = await fetchEmployees()
      const rolesData = await fetchRoles()
      const departmentsData = await fetchDepartments()

      setEmployees(employeesData)
      setRoles(rolesData)
      setDepartments(departmentsData)

      setDebugInfo({
        employees: employeesData,
        roles: rolesData,
        departments: departmentsData,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  fetchData()
}, [])

  const handleAddRole = async (data) => {
    try {
      const addedRole = await addRole(data)
      if (addedRole) {
        const updatedRoles = await fetchRoles()
        setRoles(updatedRoles)
        reset()
      } else {
        console.log('Role not added')
      }
    } catch (err) {
      console.error('Error adding role:', err)
    }
  }

  const handleDeleteRole = async (id) => {
    try {
      const response = await deleteRole(id)
      if (response) {
        const updatedRoles = await fetchRoles()
        setRoles(updatedRoles)
      } else {
        console.log('Role not deleted')
      }
    } catch (err) {
      console.error('Error deleting role:', err)
    }
  }

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>
  }

  // if (error) {
  //   return <div className="text-center text-red-500">Error: {error}</div>
  // }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Roles List</h1>
      <form onSubmit={handleSubmit(handleAddRole)} className="mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register('title', { required: true })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salary
          </label>
          <input
            type="integer"
            {...register('salary', { required: true })}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <select
            {...register('department', { required: true })}
            className="mt-1 p-2 border rounded w-full"
          >
            {departments.map((department, index) => (
              <option
                key={`${department.department_name}-${index}`}
                value={department.department_id}
              >
                {department.department_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add Role
        </button>
      </form>
      <ul className="space-y-4">
        {roles.map((role) => (
          <li key={role.id} className="p-4 border rounded-lg shadow-md">
            <p className="text-lg font-semibold">
              <strong>Title:</strong> {role.job_title}
            </p>
            <p className="text-gray-700">
              <strong>Salary:</strong> {role.salary}
            </p>
            <p className="text-gray-700">
              <strong>Department:</strong> {role.department}
            </p>
            <button
              onClick={() => handleDeleteRole(role.role_id)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Debug Information</h2>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
    </div>
  )
}

export default RoleList

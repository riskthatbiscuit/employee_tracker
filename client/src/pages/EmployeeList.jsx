import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { addEmployee } from '../services/additions.js'
import { fetchEmployees, fetchRoles } from '../services/displays.js'
import { deleteEmployee } from '../services/deletions.js'

const EmployeeList = () => {
  const { register, handleSubmit, reset } = useForm()
  const [employees, setEmployees] = useState([])
  const [jobTitles, setJobTitles] = useState([])
  const [managers, setManagers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible)
  }

  const getEmployees = async () => {
    try {
      const data = await fetchEmployees()
      setEmployees(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const getJobTitles = async () => {
    try {
      const data = await fetchRoles()
      setJobTitles(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const getManagers = async () => {
    try {
      const data = await fetchEmployees()
      setManagers(data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    getEmployees()
    getJobTitles()
    getManagers()
  }, [])

  const onSubmit = async (data) => {
    try {
      const addedEmployee = await addEmployee(data)
      if (addedEmployee) {
        await getEmployees() // Rerun getEmployees to update the state
      } else {
        console.log('Employee not added')
      }
      reset()
    } catch (err) {
      setError(err.message)
    }
  }

  const navigate = useNavigate()
  const handleEmployeeClick = (employee_id) => {
    navigate(`/employees/${employee_id}`)
  }

  const handleDeleteEmployee = async (id) => {
    try {
      const deleted = await deleteEmployee(id)
      if (deleted) {
        const updatedEmployees = await fetchEmployees()
        setEmployees(updatedEmployees)
      } else {
        console.log('Employee not deleted')
      }
    } catch (err) {
      console.error('Error deleting employee:', err)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Employee List</h2>
        <button
          onClick={toggleFormVisibility}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          {isFormVisible ? 'Hide Add Employee Form' : 'Show Add Employee Form'}
        </button>
      </div>
      {isFormVisible && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 space-y-4 border-2 p-2"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              {...register('first_name', { required: true })}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              {...register('last_name', { required: true })}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <select
              {...register('job_title', { required: true })}
              className="mt-1 p-2 border rounded w-full"
            >
              {jobTitles.map((title, index) => (
                <option key={`${title.role_id}-${index}`} value={title.role_id}>
                  {title.job_title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Manager
            </label>
            <select
              {...register('manager', { required: true })}
              className="mt-1 p-2 border rounded w-full"
            >
              {managers.map((manager, index) => (
                <option
                  key={`${manager.id}-${index}`}
                  value={manager.employee_id}
                >
                  {manager.first_name + ' ' + manager.last_name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-green-500 text-white rounded"
          >
            Add Employee
          </button>
        </form>
      )}
      <ul className="space-y-2">
        {employees.map((employee, index) => (
          <li
            key={index}
            className="p-4 border rounded shadow flex justify-between"
            onClick={() => handleEmployeeClick(employee.employee_id)}
          >
            <div>
              <h3 className="text-xl font-semibold">
                {employee.first_name + ' ' + employee.last_name}
              </h3>
              <p>{employee.job_title}</p>
              <p>{employee.manager}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteEmployee(employee.employee_id)
              }}
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EmployeeList

import React, { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchEmployee, fetchManagedEmployees } from '../services/displays'

const EmployeeDetail = () => {
  const { id } = useParams() // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null)
  const [managedEmployees, setManagedEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeData = await fetchEmployee(id)
        const managedEmployeesData = await fetchManagedEmployees(id)

        setEmployee(employeeData[0])
        setManagedEmployees(managedEmployeesData)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    if (employee) {
      console.log(`Employee: ${JSON.stringify(employee, null, 2)}`)
    }
  }, [employee])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!employee) {
    return <div>No employee found</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Employee Details
      </h2>
      {employee && (
        <>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">ID:</span>
              <span className="text-gray-900">{employee.employee_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">First Name:</span>
              <span className="text-gray-900">{employee.first_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Last Name:</span>
              <span className="text-gray-900">{employee.last_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Job Title:</span>
              <span className="text-gray-900">{employee.job_title}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Department:</span>
              <span className="text-gray-900">{employee.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Salary:</span>
              <span className="text-gray-900">{employee.salary}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Manager:</span>
              {employee.manager ? (
                <Link
                  to={`/employees/${employee.manager_id}`}
                  className="text-blue-500 hover:underline"
                >
                  {employee.manager}
                </Link>
              ) : (
                <span className="text-gray-900">None</span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">
              Managed Employees:
            </span>
            {managedEmployees.length > 0 ? (
              <ul>
                {managedEmployees.map((emp) => (
                  <li key={emp.employee_id}>
                    <Link
                      to={`/employees/${emp.employee_id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {emp.first_name} {emp.last_name} - {emp.job_title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-900">None</span>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default EmployeeDetail

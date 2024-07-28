import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetail = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch employee data from the backend
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/employees/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!employee) {
    return <div>No employee found</div>;
  }

  return (
    <div>
      <h1>Employee Detail</h1>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Role:</strong> {employee.role}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default EmployeeDetail;
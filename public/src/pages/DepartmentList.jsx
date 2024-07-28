import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchDepartments } from '../services/displays';
import { addDepartment } from '../services/additions';
import { deleteDepartment } from '../services/deletions.js';

const DepartmentList = () => {
  const { register, handleSubmit, reset } = useForm();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadDepartments();
  }, []);

  const handleAddDepartment = async (data) => {
    try {
      const addedDepartment = await addDepartment(data);
      console.log(data)
      if (addedDepartment) {
        const updatedDepartments = await fetchDepartments();
        setDepartments(updatedDepartments);
        reset();
      } else {
        console.log('Department not added');
      }
    } catch (err) {
      console.error('Error adding department:', err);
    }
  };

  const handleDeleteDepartment = async (id) => {
    try {
      const deleted = await deleteDepartment(id);
      if (deleted) {
        const updatedDepartments = await fetchDepartments();
        setDepartments(updatedDepartments);
      } else {
        console.log('Department not deleted');
      }
    } catch (err) {
      console.error('Error deleting department:', err);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Departments List</h1>
      <form onSubmit={handleSubmit(handleAddDepartment)} className="mb-4">
        <input
          type="text"
          {...register('department_name')}
          placeholder="New Department Name"
          className="p-2 border rounded mr-2"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Add Department</button>
      </form>
      <ul className="space-y-4">
        {departments.map((department, index) => (
          <li key={department.department_id} className="p-4 border rounded-lg shadow-md">
            <p className="text-lg font-semibold"><strong>Name:</strong> {department.department_name}</p>
            <button
              onClick={() => handleDeleteDepartment(department.department_id)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
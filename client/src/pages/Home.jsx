import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Employee Tracker</h2>
      <div className="space-y-4">
        <Link to="/employees">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Employee List</button>
        </Link>
        <Link to="/roles">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Role List</button>
        </Link>
        <Link to="/departments">
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700">Department List</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
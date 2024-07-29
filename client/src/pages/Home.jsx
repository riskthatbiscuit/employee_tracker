import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">
        Welcome to the Employee Tracker
      </h2>
      <div className="space-y-4 w-full flex flex-col items-center">
        <Link to="/employees" className="w-full flex justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-1/2">
            Employee List
          </button>
        </Link>
        <Link to="/roles" className="w-full flex justify-center">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-1/2">
            Role List
          </button>
        </Link>
        <Link to="/departments" className="w-full flex justify-center">
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 w-1/2">
            Department List
          </button>
        </Link>
      </div>
      <img src="/schematic.png" alt="Schematic" className="mb-4 w-1/2" />
    </div>
  )
}

export default Home

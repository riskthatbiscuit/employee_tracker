import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <Link to="/">
        <h1 className="text-2xl font-bold">Employee Tracker</h1>
      </Link>
    </header>
  );
};

export default Header;
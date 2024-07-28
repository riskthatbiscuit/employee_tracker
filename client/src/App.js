import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetail from './pages/EmployeeDetail';
import RoleList from './pages/RoleList';
import DepartmentList from './pages/DepartmentList';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/departments" element={<DepartmentList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
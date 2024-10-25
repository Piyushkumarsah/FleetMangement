import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl">Fleet Management Dashboard</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white">Dashboard</Link>
          <Link to="/vehicles" className="text-white">Manage Vehicles</Link>
          <Link to="/add" className="text-white">Add Vehicle</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

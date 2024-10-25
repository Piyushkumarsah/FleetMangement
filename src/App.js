import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList';
import Navbar from './components/Navbar';
import demoVehicles from './components/DemoVehicles';

function App() {
  const [vehicles, setVehicles] = useState(demoVehicles);
  return (
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard vehicles={vehicles} />} />
              <Route
                path="/vehicles"
                element={<VehicleList vehicles={vehicles} setVehicles={setVehicles} />}
              />
              <Route
                path="/add"
                element={<VehicleForm vehicles={vehicles} setVehicles={setVehicles} />}
              />
              <Route
                path="/edit/:id"
                element={<VehicleForm vehicles={vehicles} setVehicles={setVehicles} />}
              />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;

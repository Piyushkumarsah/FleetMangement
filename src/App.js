import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VehicleForm from './components/VehicleForm';
import Navbar from './components/Navbar';
import { initializeVehicles } from './features/vehicles/vehicleSlice'; 

import { updateVehicleStatus } from './features/vehicles/vehicleSlice'; 
import VehicleList from './components/VehicleList';
import Dashboard from './components/Dashboard';
function App() {
  const dispatch = useDispatch();
  const vehicles = useSelector(state => state.vehicles || []);
  useEffect(() => {
    dispatch(initializeVehicles()); 
  }, [dispatch]);
  useEffect(() => {
    const intervalId = setInterval(() => {
        const now = new Date();
        vehicles.forEach(vehicle => {
            let updatedVehicle = { ...vehicle };

            if (vehicle.scheduledChargingTime && new Date(vehicle.scheduledChargingTime) <= now) {
                updatedVehicle = {
                    ...vehicle,
                    status: 'Charging',
                    battery: Math.min(100, vehicle.battery + 10),
                };
            } else if (vehicle.status === 'In Transit') {
                const newDistance = vehicle.distanceTravelled + 3;
                const distanceIncreasedBy3km = Math.floor(newDistance / 3) > Math.floor(vehicle.distanceTravelled / 3);
                updatedVehicle = {
                    ...vehicle,
                    battery: distanceIncreasedBy3km ? Math.max(0, vehicle.battery - 1) : vehicle.battery,
                    distanceTravelled: newDistance,
                };
            } else if (vehicle.status === 'Charging') {
                updatedVehicle.battery = Math.min(100, vehicle.battery + 10);
            }

            if (updatedVehicle.battery !== vehicle.battery || updatedVehicle.status !== vehicle.status) {
                dispatch(updateVehicleStatus(updatedVehicle));
            }
        });
    }, 6000);

    return () => clearInterval(intervalId);
}, [dispatch, vehicles]);
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/add" element={<VehicleForm />} />
            <Route path="/edit/:id" element={<VehicleForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

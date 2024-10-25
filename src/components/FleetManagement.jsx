import React, { useState } from 'react';
import VehicleList from './VehicleList';
import VehicleForm from './VehicleForm'; // Assuming you'll use this for the edit form

const FleetManagement = () => {
  // State to manage the list of vehicles
  const [vehicles, setVehicles] = useState([
    { id: 'EV1', battery: 75, distance: 100, status: 'In Transit', lastChargeTime: new Date() },
    { id: 'EV2', battery: 20, distance: 200, status: 'Charging', lastChargeTime: new Date() },
    // Add more initial vehicles if needed
  ]);

  // State to keep track of the selected vehicle for editing
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Function to handle editing a vehicle
  const handleSaveVehicle = (updatedVehicle) => {
    setVehicles(prevVehicles =>
      prevVehicles.map(vehicle =>
        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
      )
    );
    // Clear the selected vehicle after saving changes
    setSelectedVehicle(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Fleet Management Dashboard</h1>

      {/* Vehicle List Component */}
      <VehicleList
        vehicles={vehicles}
        setVehicles={setVehicles}
        setSelectedVehicle={setSelectedVehicle} // Pass the edit function
      />

      {/* Edit Vehicle Form (only shows if a vehicle is selected) */}
      {selectedVehicle && (
        <VehicleForm
          vehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          onSave={handleSaveVehicle} // Save edited vehicle data
        />
      )}
    </div>
  );
};

export default FleetManagement;

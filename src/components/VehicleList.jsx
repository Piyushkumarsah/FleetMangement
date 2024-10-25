import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const VehicleList = ({ vehicles, setVehicles, setSelectedVehicle }) => {
//   const updateVehicleStatus = (updatedVehicle) => {
//     setVehicles((prevVehicles) =>
//       prevVehicles.map((vehicle) =>
//         vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
//       )
//     );
//   };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => {
          if (vehicle.scheduledChargingTime && new Date(vehicle.scheduledChargingTime) <= now) {
            return { ...vehicle, status: 'Charging', battery: Math.min(100, vehicle.battery + 10) };
          }

          if (vehicle.status === 'In Transit') {
            const newDistance = vehicle.distanceTravelled + 3;

            const distanceIncreasedBy3km = Math.floor(newDistance / 3) > Math.floor(vehicle.distanceTravelled / 3);
            const newBattery = distanceIncreasedBy3km
              ? Math.max(0, vehicle.battery - 1)
              : vehicle.battery;

            return { ...vehicle, battery: newBattery, distanceTravelled: newDistance };
          } else if (vehicle.status === 'Charging') {
            const newBattery = Math.min(100, vehicle.battery + 10);
            return { ...vehicle, battery: newBattery };
          }

          return vehicle;
        })
      );
    }, 600000); 

    return () => clearInterval(intervalId);
  }, [setVehicles]);

//   const handleEditClick = (vehicle) => {
//     setSelectedVehicle(vehicle);
//   };

  const handleDeleteClick = (id) => {
    setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-4xl text-center font-bold mb-6">Vehicle List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2">Vehicle ID</th>
              <th className="py-2 px-4 border-b-2">Battery (%)</th>
              <th className="py-2 px-4 border-b-2">Total Distance (km)</th>
              <th className="py-2 px-4 border-b-2">Status</th>
              <th className="py-2 px-4 border-b-2">Scheduled Charging</th>
              <th className="py-2 px-4 border-b-2">Last Charge Time</th>
              <th className="py-2 px-4 border-b-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className={`${vehicle.battery <= 20 ? 'bg-red-100' : ''}`}>
                <td className="py-2 px-4 text-center border-b-2">{vehicle.id}</td>
                <td className="py-2 px-4 text-center border-b-2">{vehicle.battery}%</td>
                <td className="py-2 px-4 text-center border-b-2">{vehicle.distanceTravelled} km</td>
                <td className="py-2 px-4 text-center border-b-2">{vehicle.status}</td>
                <td className="py-2 px-4 text-center border-b-2">{vehicle.scheduledChargingTime}</td>
                <td className="py-2 px-4 text-center border-b">{vehicle.lastChargeTime}</td>

                <td className="py-2 px-4 text-center border-b-2">
                  <Link to={`/edit/${vehicle.id}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</Link>
                  <button
                    onClick={() => handleDeleteClick(vehicle.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleList;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeVehicle, updateVehicle } from '../features/vehicles/vehicleSlice';

const VehicleList = () => {
  const vehicles = useSelector(state => state.vehicles);
  const dispatch = useDispatch();

  const handleDeleteClick = (id) => {
    dispatch(removeVehicle(id));
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

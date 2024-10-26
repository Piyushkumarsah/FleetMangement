import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addVehicle, updateVehicle } from '../features/vehicles/vehicleSlice';

const formatDateTime = (dateTime) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateTime));
};

const VehicleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEdit = Boolean(id);
  const vehicles = useSelector(state => state.vehicles);
  const currentVehicle = isEdit ? vehicles.find(v => v.id === id) : null;

  const [vehicleData, setVehicleData] = useState({
    id: currentVehicle?.id || '',
    battery: currentVehicle?.battery || 0,
    distanceTravelled: currentVehicle?.distanceTravelled || 0,
    status: currentVehicle?.status || 'Idle',
    lastChargeTime: currentVehicle?.lastChargeTime || formatDateTime(new Date()),
    scheduledChargingTime: currentVehicle?.scheduledChargingTime || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedVehicleData = {
      ...vehicleData,
      lastChargeTime:
        vehicleData.status === 'Charging' && vehicleData.scheduledChargingTime
          ? formatDateTime(vehicleData.scheduledChargingTime)
          : vehicleData.lastChargeTime,
      scheduledChargingTime: vehicleData.scheduledChargingTime ? formatDateTime(vehicleData.scheduledChargingTime) : '',
    };

    if (isEdit) {
      dispatch(updateVehicle(updatedVehicleData));
    } else {
      dispatch(addVehicle(updatedVehicleData));
    }
    navigate('/vehicles');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block font-medium">Vehicle ID</label>
          <input
            type="text"
            name="id"
            value={vehicleData.id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={isEdit}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Battery (%)</label>
          <input
            type="number"
            name="battery"
            value={vehicleData.battery}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Total Distance (km)</label>
          <input
            type="number"
            name="distanceTravelled"
            value={vehicleData.distanceTravelled}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={vehicleData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Idle">Idle</option>
            <option value="In Transit">In Transit</option>
            <option value="Charging">Charging</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium">Scheduled Charging Time</label>
          <input
            type="datetime-local"
            name="scheduledChargingTime"
            value={vehicleData.scheduledChargingTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEdit ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
      </form>
    </div>
  );
};

export default VehicleForm;

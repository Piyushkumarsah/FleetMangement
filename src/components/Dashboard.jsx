import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const vehicles = useSelector(state => state.vehicles || []); 

    if (vehicles.length === 0) {
        return <div>Loading vehicles...</div>; 
    }

    const lowBatteryVehicles = vehicles.filter(vehicle => vehicle.battery <= 15);

    const averageBattery = vehicles.length > 0
        ? (vehicles.reduce((total, vehicle) => total + vehicle.battery, 0) / vehicles.length).toFixed(2)
        : 0;

    const vehiclesBelow20 = vehicles.filter(vehicle => vehicle.battery < 20).length;

    const vehicleStatusData = [
        { name: 'In Transit', value: vehicles.filter(v => v.status === 'In Transit').length },
        { name: 'Charging', value: vehicles.filter(v => v.status === 'Charging').length },
        { name: 'Idle', value: vehicles.filter(v => v.status === 'Idle').length },
    ];

    const batteryDistribution = vehicles.map(vehicle => ({
        id: vehicle.id,
        battery: vehicle.battery,
        status: vehicle.status, 
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const getBatteryColor = (status) => {
        if (status === "In Transit") return '#2563eb'; 
        else if (status === "Idle") return '#ffbb28'; 
        return '#82ca9d'; 
    };

    const calculateEstimatedChargingTime = (battery) => {
        const targetBattery = 100; 
        const batteryNeeded = targetBattery - battery; 
        const chargingRate = 10; 
        const timeToCharge = (batteryNeeded / chargingRate) * 10; 
        return timeToCharge > 0 ? timeToCharge : 0; 
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Fleet Overview Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="font-semibold text-gray-600">Vehicles In Transit</h3>
                    <p className="text-2xl font-bold text-blue-600">
                        {vehicles.filter(v => v.status === 'In Transit').length}
                    </p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="font-semibold text-gray-600">Vehicles Charging</h3>
                    <p className="text-2xl font-bold text-green-600">
                        {vehicles.filter(v => v.status === 'Charging').length}
                    </p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="font-semibold text-gray-600">Idle Vehicles</h3>
                    <p className="text-2xl font-bold text-yellow-600">
                        {vehicles.filter(v => v.status === 'Idle').length}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="font-semibold text-gray-600 mb-4">Fleet Battery Health</h3>
                    <p className="text-gray-600">Average Battery: <span className="font-bold">{averageBattery}%</span></p>
                    <p className="text-gray-600">Vehicles below 20%: <span className="font-bold">{vehiclesBelow20}</span></p>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="font-semibold text-gray-600 mb-4">Vehicle Status Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={vehicleStatusData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {vehicleStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg mb-8">
                <h3 className="font-semibold text-gray-600 mb-4">Battery Levels Across Fleet (10% battery Increase in 6 sec for simulation purpose & 1% dec for in Transit state)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={batteryDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="battery">
                            {batteryDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBatteryColor(entry.status)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

                <div className="mt-4">
                    <h4 className="font-semibold text-gray-600">Color Legend:</h4>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-gray-700">In Transit</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-gray-700">Charging</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-[#ffbb28] rounded-full mr-2"></div>
                        <span className="text-gray-700">Idle</span>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg mb-8">
                <h3 className="font-semibold text-gray-600 mb-4">Estimated Charging Time for Vehicles</h3>
                <ul>
                    {vehicles.map(vehicle => (
                        <li key={vehicle.id} className="text-gray-700">
                            Vehicle ID: {vehicle.id} - Estimated Charging Time: <strong>{calculateEstimatedChargingTime(vehicle.battery)} minutes</strong>
                        </li>
                    ))}
                </ul>
            </div>

            {lowBatteryVehicles.length > 0 && (
                <div className="p-6 bg-red-100 rounded-lg shadow-lg">
                    <h3 className="font-semibold text-red-700">Low Battery Alerts</h3>
                    {lowBatteryVehicles.map(vehicle => (
                        <div key={vehicle.id} className="text-red-700">
                            <strong>Vehicle ID:</strong> {vehicle.id} - <strong>Battery:</strong> {vehicle.battery}%
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;

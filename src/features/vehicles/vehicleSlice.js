import { createSlice } from '@reduxjs/toolkit';
import demoVehicles from '../../components/DemoVehicles' // Import demo data

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: [],
  reducers: {
    initializeVehicles: (state) => {
      // Populate state with demoVehicles initially
      return demoVehicles;
    },
    addVehicle: (state, action) => {
      state.push(action.payload);
    },
    updateVehicle: (state, action) => {
      const index = state.findIndex(vehicle => vehicle.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeVehicle: (state, action) => {
      return state.filter(vehicle => vehicle.id !== action.payload);
    },
    updateVehicleStatus: (state, action) => {
      const index = state.findIndex(vehicle => vehicle.id === action.payload.id);
      if (index !== -1) {
        state[index].status = action.payload.status;
        state[index].battery = action.payload.battery;
      }
    },
  },
});

export const { initializeVehicles, addVehicle, updateVehicle, removeVehicle, updateVehicleStatus } = vehicleSlice.actions;
export default vehicleSlice.reducer;

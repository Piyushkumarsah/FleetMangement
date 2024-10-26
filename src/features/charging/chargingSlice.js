import { createSlice } from '@reduxjs/toolkit';

const chargingSlice = createSlice({
  name: 'charging',
  initialState: [],
  reducers: {
    scheduleCharging: (state, action) => {
      const vehicle = state.find(vehicle => vehicle.id === action.payload.id);
      if (vehicle) vehicle.scheduledChargingTime = action.payload.time;
    },
    startCharging: (state, action) => {
      const vehicle = state.find(vehicle => vehicle.id === action.payload);
      if (vehicle) vehicle.status = 'Charging';
    },
  },
});

export const { scheduleCharging, startCharging } = chargingSlice.actions;
export default chargingSlice.reducer;

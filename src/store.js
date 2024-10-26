import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from './features/vehicles/vehicleSlice';
import chargingReducer from './features/charging/chargingSlice';

const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
    charging: chargingReducer,
  },
});

export default store;

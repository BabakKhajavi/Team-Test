import { configureStore } from '@reduxjs/toolkit';
import businessReducer from './business-slice';

const store = configureStore({
    reducer:
    {
        business: businessReducer,
    }
});

export default store;
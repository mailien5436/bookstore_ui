import { configureStore } from '@reduxjs/toolkit';
import { localStorageMiddleware } from './localStorageMiddleware';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import orderReducer from './orderSlice';
import orderDetailReducer from './orderDetailSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        order: orderReducer,
        orderDetail: orderDetailReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

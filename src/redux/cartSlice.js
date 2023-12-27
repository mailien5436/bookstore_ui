import { createSlice } from '@reduxjs/toolkit';

const cart = JSON.parse(localStorage.getItem('cart')) || [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: cart,
        total: calculateTotal(cart),
    },
    reducers: {
        addToCart: (state, action) => {
            const existingProductIndex = state.items.findIndex((product) => product.slug === action.payload.slug);

            if (existingProductIndex !== -1) {
                state.items[existingProductIndex].quantity += action.payload.quantity;
            } else {
                state.items = [...state.items, action.payload];
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((product) => product.slug !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { slug, quantity } = action.payload;
            const product = state.items.find((product) => product.slug === slug);

            if (product) {
                product.quantity = isNaN(quantity) ? 0 : quantity;
            }
        },
        updateTotal: (state) => {
            state.total = calculateTotal(state.items || []);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
});

function calculateTotal(items) {
    return items.reduce((total, product) => total + product.quantity * product.price, 0);
}

export const { addToCart, removeFromCart, updateQuantity, updateTotal, updateCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
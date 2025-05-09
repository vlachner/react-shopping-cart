import { createSlice } from '@reduxjs/toolkit';


const findItemByName = (state, name) => state.items.find(item => item.name === name)

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
    },
    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const cartItem = findItemByName(state, name);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }
        },

        removeItem: (state, action) => {
            const { name } = action.payload;
            state.items = state.items.filter(item => item.name !== name);
        },

        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const cartItem = findItemByName(state, name);
            if (cartItem && quantity > 0) {
                cartItem.quantity = quantity;
            } else if (cartItem && quantity <= 0) {
                state.items = state.items.filter(item => item.name !== name);
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

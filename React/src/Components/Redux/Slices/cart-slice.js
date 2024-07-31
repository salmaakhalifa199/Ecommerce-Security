import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    initialState: [],
    name: "cartSlice",
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
            // localStorage.setItem("cartProducts",action.payload);
        },
        removeFromCart: (state, action) => {
            state.pop(action.payload);
        },
        clearCart: (state, action) => { }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
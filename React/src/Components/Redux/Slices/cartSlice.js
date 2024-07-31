import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState: [],
    reducers: {
        addToCart: function (state, actions) {

        },
        removeFromCart: function (state, actions) {

        },
        clearCart: function (state, actions) {

        }
    }
})

// export const { addToCart, removeFromCart, clearCart } = CartSlice.actions;
// export default CartSlice.reducer;

export const {addToCart,removeFromCart,clearCart} = cartSlice.actions;
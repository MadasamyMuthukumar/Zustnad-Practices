import { create } from "zustand";
import { produce } from "immer";
import { createSelectors } from "./createCartSelectors";
/**
 * Create one custom hook that will be entry point for our hook
 * equal to slice in redux and going to contains our initial state and all different actions to deal with state
 * this custom hook will create one fn that will return an object
 * that object contains our actual state
 * set fn we got from create, will helps us to set value of our new state
 */

// export const useCartStore = create((set)=> ({
//     cart:[],  //initial value
//     addToCart: (newProd) => set((state)=> ({ cart: [...state.cart , newProd]})), //object containing specific 
//     removeFromCart: (itemId)=> set((state)=>({cart: state.cart.filter((item)=> item.id != itemId)})),
//     clearCart:()=> set({cart:[]})                                                                           //thing we want to change (cart)

// }))

//with immer we can mutate the state

export const useCartStore = create((set) => ({
    cart: [],  // initial value
    addToCart: (newProd) => set(produce((state) => {
        state.cart.push(newProd);
    })),
    removeFromCart: (itemId) => set(produce((state) => {
        state.cart = state.cart.filter((item) => item.id !== itemId);
    })),
    clearCart: () => set(produce((state) => {
        state.cart = [];
    }))
}));

//exporting all selectors and use it in any component
// export const addSelector = (state)=>state.addToCart
// export const removeSelector = (state)=>state.removeFromCart
// export const clearSelector = (state)=>state.clearCart
// export const cartSelector = (state)=>state.cart

//By using createSelector function, generating all selector fns by passing our store to it

export const useCartStoreSelectors = createSelectors(useCartStore)

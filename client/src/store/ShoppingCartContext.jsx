import { createContext } from "react";

export const CartContext = createContext({
    items: [],
    onAddToCart: (item) => {},
    onUpdateCartItemQuantity: (item) => {}
})

function cartReducer(state, action) {

}

export default function CartContextProvider({children}) {

    
}
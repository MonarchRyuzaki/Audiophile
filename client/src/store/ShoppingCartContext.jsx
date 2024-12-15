import { createContext, useReducer } from "react";

export const CartContext = createContext({
  cartData: { items: [], total: 0 },
  onAddToCart: (item) => {},
  onUpdateCartItemQuantity: (item) => {},
  onRemoveItem: (item) => {},
  onRemoveAllItems: () => {},
});

const initialState = {
  items: [],
  total: 0,
};

function cartReducer(state, action) {
  if (action.type === "ADD_TO_CART") {
    const { slug, name, count, image, category, price } = action.payload;
    const existingItemIndex = state.items.findIndex(
      (item) => item.slug === slug
    );

    if (existingItemIndex !== -1) {
      const updatedState = {
        items: state.items.map((item) =>
          item.slug === slug
            ? { ...item, count: parseInt(item.count) + parseInt(count) }
            : item
        ),
        total: state.total + parseInt(price) * parseInt(count),
      };
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    }
    
    const updatedState = {
      items: [...state.items, { slug, name, count, image, category, price }],
      total: state.total + parseInt(price) * parseInt(count),
    };
    localStorage.setItem("cart", JSON.stringify(updatedState));
    return updatedState;
  }
  if (action.type === "UPDATE_CART_ITEM_QUANTITY") {
    const { slug, change } = action.payload;

    const updatedItems = state.items
      .map((item) => {
        if (item.slug === slug) {
          const newCount = parseInt(item.count) + parseInt(change);
          if (newCount < 1) {
            return null;
          }
          return { ...item, count: newCount };
        }
        return item;
      })
      .filter((item) => item !== null);

    const updatedTotal = updatedItems.reduce((total, item) => {
      return total + parseInt(item.price) * parseInt(item.count);
    }, 0);

    const updatedState = {
      items: updatedItems,
      total: updatedTotal,
    };
    localStorage.setItem("cart", JSON.stringify(updatedState));
    return updatedState;
  }
  if (action.type === "REMOVE_ITEM") {
    const updatedState = {
      items: state.items.filter((item) => item.slug !== action.payload.slug),
      total:
        state.total -
        parseInt(action.payload.price) * parseInt(action.payload.count),
    };
    localStorage.setItem("cart", JSON.stringify(updatedState));
    return updatedState;
  }
  if (action.type === "REMOVE_ALL_ITEMS") {
    localStorage.setItem("cart", JSON.stringify(initialState));
    return initialState;
  }
}

export default function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : initialState);

  function onAddToCart(item) {
    dispatch({ type: "ADD_TO_CART", payload: item });
  }

  function onUpdateCartItemQuantity(item, change) {
    dispatch({
      type: "UPDATE_CART_ITEM_QUANTITY",
      payload: { slug: item.slug, change: change },
    });
  }

  function onRemoveItem(item) {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  }

  function onRemoveAllItems() {
    dispatch({ type: "REMOVE_ALL_ITEMS" });
  }

  const ctxValue = {
    cartData: state,
    onAddToCart,
    onUpdateCartItemQuantity,
    onRemoveItem,
    onRemoveAllItems,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

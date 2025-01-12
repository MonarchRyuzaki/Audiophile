import { createContext, useReducer } from "react";
import { CartItem } from "../types";

interface CartDataType {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  cartData: CartDataType;
  onAddToCart: (item: CartItem) => void;
  onUpdateCartItemQuantity: (item: CartItem, change: number) => void;
  onRemoveItem: (item: CartItem) => void;
  onRemoveAllItems: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartData: { items: [], total: 0 },
  onAddToCart: (item) => {},
  onUpdateCartItemQuantity: (item) => {},
  onRemoveItem: (item) => {},
  onRemoveAllItems: () => {},
});

const initialState: CartDataType = {
  items: [],
  total: 0,
};

type CartActionType =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | {
      type: "UPDATE_CART_ITEM_QUANTITY";
      payload: { slug: string; change: number };
    }
  | { type: "REMOVE_ITEM"; payload: CartItem }
  | { type: "REMOVE_ALL_ITEMS" };

function cartReducer(
  state: CartDataType,
  action: CartActionType
): CartDataType {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { slug, name, count, image, category, price } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.slug === slug
      );

      if (existingItemIndex !== -1) {
        const updatedState = {
          items: state.items.map((item) =>
            item.slug === slug ? { ...item, count: item.count + count } : item
          ),
          total: state.total + price * count,
        };
        localStorage.setItem("cart", JSON.stringify(updatedState));
        return updatedState;
      }

      const updatedState = {
        items: [...state.items, { slug, name, count, image, category, price }],
        total: state.total + price * count,
      };
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    }
    case "UPDATE_CART_ITEM_QUANTITY": {
      const { slug, change } = action.payload;

      const updatedItems = state.items
        .map((item) => {
          if (item.slug === slug) {
            const newCount = item.count + change;
            if (newCount < 1) {
              return null;
            }
            return { ...item, count: newCount };
          }
          return item;
        })
        .filter((item) => item !== null);

      const updatedTotal = updatedItems.reduce((total, item) => {
        return total + item.price * item.count;
      }, 0);

      const updatedState = {
        items: updatedItems,
        total: updatedTotal,
      };
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    }
    case "REMOVE_ITEM": {
      const updatedState = {
        items: state.items.filter((item) => item.slug !== action.payload.slug),
        total: state.total - action.payload.price * action.payload.count,
      };
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    }
    case "REMOVE_ALL_ITEMS": {
      localStorage.setItem("cart", JSON.stringify(initialState));
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    cartReducer,
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : initialState
  );

  function onAddToCart(item: CartItem) {
    dispatch({ type: "ADD_TO_CART", payload: item });
  }

  function onUpdateCartItemQuantity(item: CartItem, change: number) {
    dispatch({
      type: "UPDATE_CART_ITEM_QUANTITY",
      payload: { slug: item.slug, change: change },
    });
  }

  function onRemoveItem(item: CartItem) {
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

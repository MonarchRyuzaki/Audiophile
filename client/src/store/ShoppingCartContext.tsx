import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useReducer } from "react";
import { Slide, toast } from "react-toastify";
import {
  getCartItems,
  onAddToCartItems,
  onClearingCart,
  onUpdateItemQuantity,
} from "../api";
import { CartItem } from "../types";

interface CartDataType {
  items: CartItem[];
  total: number;
  showCart?: boolean;
}

interface CartContextType {
  cartData: CartDataType;
  onAddToCart: (item: CartItem) => void;
  onUpdateCartItemQuantity: (item: CartItem, change: number) => void;
  onRemoveItem: (item: CartItem) => void;
  onRemoveAllItems: (removeFromDB: boolean, removeFromState: boolean) => void;
  onToggleCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartData: { items: [], total: 0, showCart: false },
  onAddToCart: (item) => {},
  onUpdateCartItemQuantity: (item) => {},
  onRemoveItem: (item) => {},
  onRemoveAllItems: (removeFromDB, removeFromState) => {},
  onToggleCart: () => {},
});

const initialState: CartDataType = {
  items: [],
  total: 0,
  showCart: true,
};

type CartActionType =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "SET_CART_ITEMS"; payload: { items: CartItem[]; total: number } }
  | {
      type: "UPDATE_CART_ITEM_QUANTITY";
      payload: { slug: string; change: number };
    }
  | { type: "TOGGLE_CART" }
  | { type: "REMOVE_ITEM"; payload: CartItem }
  | { type: "REMOVE_ALL_ITEMS" };

function cartReducer(
  state: CartDataType,
  action: CartActionType
): CartDataType {
  switch (action.type) {
    case "SET_CART_ITEMS": {
      const { items, total } = action.payload;
      return { items, total, showCart: true };
    }
    case "TOGGLE_CART": {
      return { ...state, showCart: !state.showCart };
    }
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
          showCart: state.showCart,
        };
        return updatedState;
      }

      const updatedState = {
        items: [...state.items, { slug, name, count, image, category, price }],
        total: state.total + price * count,
        showCart: state.showCart,
      };
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
        showCart: state.showCart,
      };
      return updatedState;
    }
    case "REMOVE_ITEM": {
      const updatedState = {
        items: state.items.filter((item) => item.slug !== action.payload.slug),
        total: state.total - action.payload.price * action.payload.count,
        showCart: state.showCart,
      };
      return updatedState;
    }
    case "REMOVE_ALL_ITEMS": {
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
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function getItems() {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        const cartData = await getCartItems(accessToken);
        const total = cartData?.reduce(
          (acc, item) => acc + item.price * item.count,
          0
        );
        dispatch({
          type: "SET_CART_ITEMS",
          payload: { items: cartData || [], total: total || 0 },
        });
      }
    }
    getItems();
  }, [isAuthenticated, getAccessTokenSilently]);

  async function onAddToCart(item: CartItem) {
    dispatch({ type: "ADD_TO_CART", payload: item });
    toast.success(`${item.name} added to cart!`);
    const accessToken = await getAccessTokenSilently();
    const res = await onAddToCartItems(accessToken, item);
    if (!res?.success) {
      dispatch({ type: "REMOVE_ITEM", payload: item });
      toast.error(`Failed to add ${item.name} to cart. Please try again.`);
    }
  }

  async function onUpdateCartItemQuantity(item: CartItem, change: number) {
    dispatch({
      type: "UPDATE_CART_ITEM_QUANTITY",
      payload: { slug: item.slug, change: change },
    });
    const accessToken = await getAccessTokenSilently();
    const res = await onUpdateItemQuantity(accessToken, item, change);
    if (!res?.success) {
      dispatch({
        type: "UPDATE_CART_ITEM_QUANTITY",
        payload: { slug: item.slug, change: -change },
      });
      toast.error(
        `Failed to update quantity for ${item.name}. Please try again.`
      );
    }
  }

  function onRemoveItem(item: CartItem) {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  }

  function onToggleCart() {
    dispatch({ type: "TOGGLE_CART" });
  }

  async function onRemoveAllItems(
    removeFromDB: boolean = false,
    removeFromState: boolean
  ) {
    const backupItems = state;
    if (removeFromState) dispatch({ type: "REMOVE_ALL_ITEMS" });
    if (removeFromDB) {
      const accessToken = await getAccessTokenSilently();
      const res = await onClearingCart(accessToken);
      if (!res?.success) {
        dispatch({ type: "SET_CART_ITEMS", payload: backupItems });
      }
    }
  }

  const ctxValue = {
    cartData: state,
    onAddToCart,
    onUpdateCartItemQuantity,
    onRemoveItem,
    onRemoveAllItems,
    onToggleCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

import { createContext, useReducer, useContext, useMemo, useCallback } from "react";
import { CartReducer, shoppingCart } from "../reducer/cartReduce";

const CartContext = createContext();

export function CartShopping({ children }) {
  const [state, dispatch] = useReducer(CartReducer, shoppingCart);

  const addItem = useCallback((product) => {
    dispatch({ type: "addItem", payload: { product } });
  }, [dispatch]);

  const removeItems = useCallback((id) => {
    dispatch({ type: "removeItems", payload: { id } });
  }, [dispatch]);

  const clearAll = useCallback(() => {
    dispatch({ type: "clearAll" });
  }, [dispatch]);

  const itemsArray = useMemo(() => {
    const obj = state.items || {};
    return Object.keys(obj).map((k) => {
      const entry = obj[k];
      return { ...entry.product, quantity: entry.quantity };
    });
  }, [state.items]);

  const api = useMemo(() => ({
    state,
    dispatch,
    // nicer api
    items: itemsArray,       
    itemsMap: state.items,      
    totalItems: state.totalItems,
    addItem,
    removeItems,
    clearAll,
  }), [state, dispatch, itemsArray, addItem, removeItems, clearAll]);

  return (
    <CartContext.Provider value={api}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * useCart hook
 * - Sekarang useCart() mengembalikan API lengkap
 * - Kompatibel: kode lama yang mengakses { state, dispatch } tetap bisa.
 * - Kode baru bisa pakai items / addItem / removeItems dll.
 */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartShopping provider");
  }
  return ctx;
}

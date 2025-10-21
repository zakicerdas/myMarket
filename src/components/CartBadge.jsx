import { useCart } from "../context/cartContext";
import CartModal from "./totalCart";
import { useState } from "react";
import { useTheme } from "../context/themeContext";



export default function CartBadge() {
  const { state } = useCart();
  const [open, setOpen] = useState(false);
  const { state: themeState } = useTheme();
  const total = state.totalItems ?? state.totalQuantity ?? 0;

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen(true)}
          className={themeState.mode === "light" ? "bg-white text-black p-2 border rounded-md flex items-center gap-2 hover:shadow-sm transition" : "bg-gray-800 text-white p-2 border rounded-md flex items-center gap-2 hover:shadow-sm transition"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h12l-2-7M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
          <span className="hidden md:inline">Cart</span>
        </button>

        {total > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
            {total}
          </span>
        )}
      </div>

      <CartModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
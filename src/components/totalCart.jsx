import { useEffect } from "react";
import { useCart } from "../context/cartContext";
import { useTheme } from "../context/themeContext";

export default function CartModal({ isOpen = true, onClose }) {
  const { state, dispatch } = useCart();
  const { state: themeState } = useTheme();

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const itemsArray = Object.values(state.items || {});

  const handleRemove = (id) => dispatch({ type: "removeItems", payload: { id } });
  const handleClear = () => {
    dispatch({ type: "clearAll" });
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onClose && onClose()}
      />

      <div
        className={themeState.mode === "dark" ? "relative bg-gray-800 w-full max-w-2xl mx-4 md:mx-0 rounded-lg shadow-lg overflow-hidden z-10" : "relative bg-white w-full max-w-2xl mx-4 md:mx-0 rounded-lg shadow-lg overflow-hidden z-10"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <button
            onClick={() => onClose && onClose()}
            className="px-2 py-1 rounded hover:bg-gray-700"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {itemsArray.length === 0 ? (
            <p className="text-center text-gray-500">Keranjang kosong.</p>
          ) : (
            itemsArray.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4">
                <img src={product.image} alt={product.title} className="w-16 h-16 object-contain rounded" />
                <div className="flex-1">
                  <div className="text-sm font-medium line-clamp-2">{product.title}</div>
                  <div className="text-sm text-gray-500">Qty: {quantity}</div>
                  <div className="text-sm font-semibold mt-1">${product.price}</div>
                </div>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-700 flex items-center justify-between">
          <div className="text-sm">
            Total items: <span className="font-semibold">{state.totalItems ?? state.totalQuantity ?? 0}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="px-3 py-2 text-sm rounded hover:bg-gray-300"
            >
              Clear Cart
            </button>
            <button
              onClick={() => onClose && onClose()}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
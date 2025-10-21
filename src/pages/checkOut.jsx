import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import { useCart } from "../context/cartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { state: themeState } = useTheme();
  const cart = useCart();

  const itemsArray = useMemo(() => {
    if (!cart) return [];

    if (Array.isArray(cart.items)) {
      return cart.items;
    }

    const st = cart.state ?? {};
    if (st.items && typeof st.items === "object" && !Array.isArray(st.items)) {
      return Object.keys(st.items).map((k) => {
        const entry = st.items[k];
        if (entry?.product) {
          return { ...(entry.product || {}), quantity: entry.quantity ?? 1 };
        }
        return { ...(entry || {}), id: k, quantity: entry.quantity ?? 1 };
      });
    }

    if (Array.isArray(st.items)) return st.items;

    if (cart.itemsMap && typeof cart.itemsMap === "object") {
      return Object.keys(cart.itemsMap).map((k) => {
        const e = cart.itemsMap[k];
        if (e?.product) return { ...(e.product || {}), quantity: e.quantity ?? 1 };
        return { ...(e || {}), id: k, quantity: e.quantity ?? 1 };
      });
    }

    return [];
  }, [cart]);

  const totalPrice = useMemo(() => {
    return itemsArray.reduce((sum, it) => {
      const price = Number(it.price ?? 0);
      const qty = Number(it.quantity ?? it.qty ?? 0);
      return sum + price * qty;
    }, 0);
  }, [itemsArray]);

  const handleClearCart = () => {
    if (!cart) return;

    if (typeof cart.clearAll === "function") {
      cart.clearAll();
      return;
    }
    if (typeof cart.clearCart === "function") {
      cart.clearCart();
      return;
    }
    if (typeof cart.dispatch === "function") {
      try {
        cart.dispatch({ type: "clearAll" });
      } catch (e) {
        
      }
      try {
        cart.dispatch({ type: "CLEAR_CART" });
      } catch (e) {
      }
    }
  };

  const handleOrder = () => {
    alert("terima kasih telah berbelanja");
    handleClearCart();
    navigate("/productList", { replace: true });
  };

  return (
    <div className={themeState.mode === "dark" ? "min-h-screen bg-gray-800 text-white py-8 transition" : "min-h-screen bg-gray-50 py-8 transition"}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <div className={themeState.mode === "dark" ? "bg-gray-700 rounded-lg shadow p-6": "bg-white rounded-lg shadow p-6"}>
          <div className="space-y-4">
            {itemsArray.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300">Keranjang kosong — belum ada produk di checkout.</p>
              </div>
            ) : (
              itemsArray.map((it) => (
                <div key={it.id} className="flex items-center gap-4 border-b last:border-b-0 pb-4">
                  <img src={it.image} alt={it.title} className="w-20 h-20 object-contain rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{it.title}</div>
                    <div className="text-sm text-gray-500">{it.category ?? ""}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">Rp {Number(it.price ?? 0).toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Qty: {it.quantity ?? 1}</div>
                    <div className="text-sm text-gray-700 mt-1">Subtotal: $ {(Number(it.price ?? 0) * Number(it.quantity ?? 1)).toLocaleString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
            <div className="text-left">
              <div className="text-sm text-gray-500">Total Harga</div>
              <div className="text-2xl font-bold">${Number(totalPrice).toLocaleString()}</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClearCart}
                className="px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Kosongkan
              </button>
              <button
                onClick={handleOrder}
                className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                disabled={itemsArray.length === 0}
              >
                Pesan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

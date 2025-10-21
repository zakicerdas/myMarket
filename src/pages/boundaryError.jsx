import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import { useCart } from "../context/cartContext";

export default function MiyabiCheckout() {
  const navigate = useNavigate();
  const { state: themeState } = useTheme();
  const cart = useCart();

  const katana = {
    id: "miyabi-katana-001",
    title: "Tailles Katana — Miyabi’s Signature Blade",
    description:
      "Katana legendaris milik Miyabi, dilapisi energi api biru dan segel merah yang membara. Sebilah pedang indah sekaligus mematikan.",
    price: 1000000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLzThSw4CPflQuB38xwYPwi3zI_A2Z5O4WhQ&s", // ganti jika kamu punya render sendiri
    quantity: 1,
  };

  const handleOrder = () => {
    alert("🔥 Terima kasih telah membeli Azure Flame Katana milik Miyabi 🔥");

    if (typeof cart.clearAll === "function") cart.clearAll();
    else if (cart.dispatch) cart.dispatch({ type: "clearAll" });

    // langsung kirim ke home
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen py-10 ${
        themeState.mode === "dark"
          ? "bg-gradient-to-b from-gray-900 via-[#0b132b] to-black text-blue-100"
          : "bg-gradient-to-b from-blue-100 via-blue-200 to-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-center mb-8 tracking-wider text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
          ⚔️ Azure Flame Checkout ⚔️
        </h1>
        <div className="relative bg-[#0f172a]/90 backdrop-blur-md rounded-2xl shadow-2xl border-4 border-blue-500/80 p-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-red-600/10 animate-pulse" />

          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <img
              src={katana.image}
              alt={katana.title}
              className="w-64 h-64 object-contain rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.8)] border border-blue-400/60"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-blue-400 mb-2 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                {katana.title}
              </h2>
              <p className="text-gray-300 mb-4">{katana.description}</p>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="block text-sm text-gray-400">Jumlah</span>
                  <span className="text-lg font-semibold">{katana.quantity}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Harga</span>
                  <span className="text-2xl font-bold text-blue-400 drop-shadow">
                    $ {katana.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="h-1 bg-gradient-to-r from-blue-400 via-cyan-500 to-red-500 mb-4 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-300">
                  Total Pembayaran:
                </span>
                <span className="text-2xl font-extrabold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                  $ {katana.price.toLocaleString()}
                </span>
              </div>

              {/* Tombol Pesan */}
              <button
                onClick={handleOrder}
                className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-red-500 text-white font-bold py-3 rounded-lg shadow-lg hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] transition-transform duration-300"
              >
                🔥 Pesan Katana Sekarang 🔥
              </button>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import SearchBar from "../components/searchBar";
import CategoryFilter from "../components/categoryFilter";
import ProductLists from "../components/productLists";
import CartBadge from "../components/CartBadge";
import { useTheme } from "../context/themeContext";
import { useCart } from "../context/cartContext";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const { state: themeState } = useTheme();
  const { addItem } = useCart();

  useEffect(() => {
    let productList = true;
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        if (!productList) return;
        const data = res.data;
        setProducts(data);
        const cate = Array.from(new Set(data.map((p) => p.category)));
        setCategories(cate);
      } catch (err) {
        setError(err.message || "gagal memuat data");
      } finally {
        if (productList) setLoading(false);
      }
    }
    fetchAll();
    return () => { productList = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchQuery = q ? p.title.toLowerCase().includes(q) : true;
      const matchCategory = category === "all" ? true : p.category === category;
      return matchQuery && matchCategory;
    });
  }, [products, query, category]);

  return (
    <div className={themeState.mode === "dark" ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 min-h-screen"}>
      <div className="max-w-6xl mx-auto p-4">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Product Catalog</h1>
          <div className="flex items-center gap-3">
          
            <CartBadge />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <div className="flex items-center gap-2">
            <CategoryFilter value={category} onChange={setCategory} categories={categories} />
            <button onClick={() => { setQuery(""); setCategory("all"); }} className="p-2 border rounded">Reset</button>
          </div>
        </div>

        {loading && <p className="text-center mt-8">Loading...</p>}
        {error && <p className="text-red-500">Gagal memuat data: {error}</p>}
        {!loading && !error && filtered.length === 0 && <p>Produk tidak ditemukan.</p>}
        {!loading && !error && filtered.length > 0 && (
          <ProductLists products={filtered} onAdd={addItem} />
        )}
      </div>
    </div>
  );
}

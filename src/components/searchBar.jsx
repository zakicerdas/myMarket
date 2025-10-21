export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="🔎︎ Cari produk..."
      className="w-full p-2 border rounded-md focus:outline-none"
    />
  );
}
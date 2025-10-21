import ProductCard from "./productCard";

export default function ProductLists({ products }) {
  if (!products) return null;

  return(
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
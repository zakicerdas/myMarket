import { useCart } from "../context/cartContext";

export default function productCard({product}){
    const {dispatch} = useCart();

    const AddToCart = () => {
        dispatch({type: "addItem", payload: {product}})
    };

     return (
    <div className="border rounded p-3 flex flex-col">
      <img src={product.image} alt={product.title} className="h-40 object-contain mb-2" />
      <h3 className="text-sm font-medium mb-1 line-clamp-2">{product.title}</h3>
      <p className="mt-auto font-semibold">${product.price}</p>
      <button onClick={AddToCart} className="mt-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
}
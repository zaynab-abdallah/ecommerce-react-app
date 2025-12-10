import { useCart } from "../../components/context/CartContext";

function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <img src={product.thumbnail} alt={product.title} />

            <h3>{product.title}</h3>
            <p>${product.price}</p>

            <button onClick={() => addToCart(product)}>
                Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;

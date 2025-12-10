import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
import "./productDetails.css";
import { TiShoppingCart } from "react-icons/ti";
import SlideProduct from "../../components/slideProducts/SlideProduct.jsx";
import { FaShare } from "react-icons/fa";
import ProductDetailsLoading from "./productDetailsLoading.jsx";
import { useCart } from "../../components/context/CartContext";
import { useFavorites } from "../../components/context/FavoritesContext";
import PageTransition from "../../components/PageTransition"

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [mainImage, setMainImage] = useState("");
    const { addToCart, cart } = useCart();
    const { addToFavorites, isFavorite } = useFavorites();

    // التحقق إذا كان المنتج في السلة
    const isInCart = useMemo(() => {
        if (!product || !cart) return false;
        return cart.some((item) => item.id === product.id);
    }, [cart, product]);

    // التحقق إذا كان المنتج في المفضلة
    const isProductFavorite = useMemo(() => {
        if (!product) return false;
        return isFavorite(product.id);
    }, [product, isFavorite]);

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleToggleFavorite = () => {
        addToFavorites(product);
    };
    const fetchProduct = async () => {
        try {
            const res = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await res.json();
            setProduct(data);
            setMainImage(data.images?.[0]);
        } catch (error) {
            console.log("Error fetching product:", error);
        }
    };

    useEffect(() => {
        // الصعود للأعلى عند تغيير المنتج
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // حركة سلسة
        });
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (!product) return;

        fetch(`https://dummyjson.com/products/category/${product.category}`)
            .then((res) => res.json())
            .then((data) => {
                setRelatedProducts(data.products || []);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoadingProducts(false));
    }, [product?.category]);

    if (!product) return <ProductDetailsLoading />;

    return (
        <PageTransition>
            <div>
                <div className="item_details">
                    <div className="container">
                        <motion.div 
                            className="imgs_item"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div 
                                className="big_img"
                                key={mainImage}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <img id="big_img" src={mainImage} alt={product.title} />
                            </motion.div>

                            <div className="sm_img">
                                {product.images?.map((img, index) => (
                                    <motion.img
                                        key={index}
                                        src={img}
                                        alt={product.title}
                                        onClick={() => setMainImage(img)}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        <motion.div 
                            className="details_item"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                        <h1 className="name"> {product.title}</h1>

                        <div className="stars">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>

                        <p className="price">${product.price}</p>
                        <h5>
                            Availability : <span>{product.availabilityStatus}</span>
                        </h5>
                        <h5>
                            Brand : <span>{product.brand}</span>
                        </h5>
                        <p className="desc">{product.description}</p>
                        <h5 className="stock">
                            Hurry Up ! Only <span>{product.stock}</span> Products Left In Stock.
                        </h5>

                            <motion.button 
                                className={`btn ${isInCart ? 'in-cart' : ''}`} 
                                onClick={handleAddToCart}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={isInCart ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 0.3 }}
                            >
                                {isInCart ? 'In Cart' : 'Add to Cart'} <TiShoppingCart />
                            </motion.button>

                            <motion.div 
                                className="icons"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.span 
                                    onClick={handleToggleFavorite}
                                    className={`favorite-icon-detail ${isProductFavorite ? 'favorited' : ''}`}
                                    whileHover={{ scale: 1.2 }} 
                                    whileTap={{ scale: 0.9 }}
                                    style={{ cursor: "pointer" }}
                                >
                                    {isProductFavorite ? <FaHeart /> : <FaRegHeart />}
                                </motion.span>

                                <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                    <FaShare />
                                </motion.span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {loadingProducts ? (
                    <ProductDetailsLoading />
                ) : (
                    <SlideProduct
                        key={product.category}
                        data={relatedProducts}
                        title={product.category.replace("-", " ")}
                    />
                )}
            </div>
        </PageTransition>
    );
}

export default ProductDetails;

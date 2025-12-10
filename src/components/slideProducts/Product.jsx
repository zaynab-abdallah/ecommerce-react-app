import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegHeart, FaHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

function Product({ item, index }) {
  const { cart, addToCart } = useCart();
  const { addToFavorites, isFavorite } = useFavorites();

  const product = item || {
    id: 1,
    title: "Product Name",
    price: 99.99,
    images: ["https://via.placeholder.com/200x200"]
  };

  // ⬅️ check if this product is already in cart (using useMemo)
  const inCart = useMemo(() => {
    if (cart && cart.length > 0) {
      return cart.some((p) => p.id === product.id);
    }
    return false;
  }, [cart, product.id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault(); // منع الانتقال للصفحة
    addToFavorites(product);
  };

  const isProductFavorite = isFavorite(product.id);

  return (
    <motion.div 
      className="product"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
    >

      {/* In Cart Badge */}
      {inCart && (
        <motion.div 
          className="in-cart-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          ✓ in cart
        </motion.div>
      )}

      <Link to={`/products/${product.id}`}>
        <motion.div 
          className="img_product"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img src={product.images[0]} alt="product" />
        </motion.div>

        <h3 className="name_product">{product.title}</h3>

        <div className="stars">
          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
        </div>

        <motion.p 
          className="price"
          whileHover={{ scale: 1.1, color: "#0090f0" }}
        >
          ${product.price}
        </motion.p>
      </Link>

      <motion.div 
        className="icons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.span 
          onClick={handleToggleFavorite}
          className={`favorite-icon ${isProductFavorite ? "favorited" : ""}`}
          whileHover={{ scale: 1.2 }} 
          whileTap={{ scale: 0.9 }}
          style={{ cursor: "pointer" }}
        >
          {isProductFavorite ? <FaHeart /> : <FaRegHeart />}
        </motion.span>

        <motion.span 
          onClick={handleAddToCart}
          className={`cart-icon ${inCart ? "added" : ""}`}
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <TiShoppingCart />
        </motion.span>

        <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <FaShare />
        </motion.span>
      </motion.div>

    </motion.div>
  );
}

export default Product;

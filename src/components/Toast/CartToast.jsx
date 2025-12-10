import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdCheckmarkCircle } from "react-icons/io";
import './CartToast.css';

function CartToast({ product, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // يختفي بعد 4 ثواني

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="cart-toast">
      <div className="toast-content">
        <div className="toast-icon">
          <IoMdCheckmarkCircle />
        </div>
        
        <div className="toast-image">
          <img 
            src={product.images?.[0] || product.thumbnail || "https://via.placeholder.com/50"} 
            alt={product.title} 
          />
        </div>
        
        <div className="toast-text">
          <p className="toast-product-name">{product.title}</p>
          <p className="toast-message">added to Cart</p>
        </div>
        
        <Link to="/cart" className="view-cart-btn" onClick={onClose}>
          View Cart
        </Link>
      </div>
    </div>
  );
}

export default CartToast;


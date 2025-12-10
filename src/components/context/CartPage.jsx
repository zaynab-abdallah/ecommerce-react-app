import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../PageTransition";
import "./CartPage.css";

function CartPage() {
    const { cart, removeFromCart, incrementQuantity, decrementQuantity, updateQuantity } = useCart();

    // حساب المجموع الكلي
    const totalPrice = cart ? cart.reduce((total, item) => total + (item.price * item.quantity), 0) : 0;

    if (!cart || cart.length === 0) {
        return (
            <PageTransition>
                <div className="cart_page">
                    <div className="container">
                        <motion.div 
                            className="empty_cart"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                animate={{ 
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            >
                                <TiShoppingCart style={{ fontSize: '80px', color: '#ccc' }} />
                            </motion.div>
                            <p>Your cart is empty</p>
                            <Link to="/" className="btn">Continue Shopping</Link>
                        </motion.div>
                    </div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="cart_page">
                <div className="container">
                    <motion.div 
                        className="order_summary"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h1 
                            className="cart_title"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Order Summary
                        </motion.h1>
                        
                        <div className="cart_items_list">
                            <AnimatePresence>
                                {cart.map((item, index) => (
                                    <motion.div 
                                        key={item.id} 
                                        className="cart_item"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 100 }}
                                        transition={{ delay: index * 0.1 }}
                                        layout
                                    >
                                <img 
                                    src={item.thumbnail || item.images?.[0] || "https://via.placeholder.com/80"} 
                                    alt={item.title}
                                    className="item_image"
                                />
                                
                                <div className="item_details">
                                    <h3 className="item_name">{item.title}</h3>
                                    <p className="item_price">${item.price.toFixed(2)}</p>
                                    
                                    <div className="quantity_controls">
                                        <button 
                                            className="qty_btn"
                                            onClick={() => decrementQuantity(item.id)}
                                        >
                                            -
                                        </button>
                                        <input 
                                            type="number" 
                                            className="qty_input"
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                if (value > 0) {
                                                    updateQuantity(item.id, value);
                                                }
                                            }}
                                            min="1"
                                        />
                                        <button 
                                            className="qty_btn"
                                            onClick={() => incrementQuantity(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                        <motion.button 
                                            className="delete_btn"
                                            onClick={() => removeFromCart(item.id)}
                                            title="Remove item"
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <FaTrash />
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <motion.div 
                            className="cart_footer"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                        <div className="total_row">
                            <span className="total_label">Total:</span>
                            <span className="total_price">${totalPrice.toFixed(2)}</span>
                        </div>
                        
                            <motion.button 
                                className="place_order_btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Place Order
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
}

export default CartPage;

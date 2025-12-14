import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRegHeart, FaTrash } from 'react-icons/fa';
import Product from '../components/slideProducts/Product';
import PageTransition from '../components/PageTransition';
import { useFavorites } from '../components/context/FavoritesContext';
import './FavoritesPage.css';

function FavoritesPage() {
    const { favorites, clearFavorites, removeFromFavorites } = useFavorites();

    if (!favorites || favorites.length === 0) {
        return (
            <PageTransition>
                <div className="favorites-page">
                    <div className="container">
                                    {/* Breadcrumb */}
                                    <nav className="breadcrumb">
                                        <Link to="/" className="breadcrumb-link">Home</Link>
                                        <span className="breadcrumb-separator">&gt;</span>
                                        <span className="breadcrumb-current">My Wishlist</span>
                                    </nav>

                        <motion.div
                            className="empty-favorites"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            >
                                <FaRegHeart style={{ fontSize: '80px', color: '#ccc' }} />
                            </motion.div>
                            <h2>Your Wishlist is Empty</h2>
                            <p>Add products you love to your wishlist</p>
                            <Link to="/" className="btn">Start Shopping</Link>
                        </motion.div>
                    </div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="favorites-page">
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link to="/" className="breadcrumb-link">Home</Link>
                        <span className="breadcrumb-separator">&gt;</span>
                        <span className="breadcrumb-current">My Wishlist</span>
                    </nav>

                    <motion.div
                        className="favorites-header"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="favorites-header-content">
                            <div>
                                
                                <p>{favorites.length} {favorites.length === 1 ? 'Product' : 'Products'}</p>
                            </div>
                            {favorites.length > 0 && (
                                <motion.button
                                    className="clear-all-btn"
                                    onClick={clearFavorites}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Clear All
                                </motion.button>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        className="favorites-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {favorites.map((product, index) => (
                            <div key={product.id} className="favorite-product-wrapper">
                                <motion.button
                                    className="delete-product-btn"
                                    onClick={() => removeFromFavorites(product.id)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                >
                                    <FaTrash />
                                </motion.button>
                                <Product
                                    item={product}
                                    index={index}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
}

export default FavoritesPage;


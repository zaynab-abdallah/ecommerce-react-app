import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './SearchBar.css';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // إغلاق القائمة عند النقر خارجها
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // البحث مع debouncing
    useEffect(() => {
        if (searchTerm.trim().length < 2) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        const delaySearch = setTimeout(() => {
            performSearch(searchTerm);
        }, 500); // انتظار 500ms بعد آخر حرف

        return () => clearTimeout(delaySearch);
    }, [searchTerm]);

    const performSearch = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=8`);
            const data = await response.json();
            setResults(data.products || []);
            setShowDropdown(true);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setShowDropdown(false);
        }
    };

    const handleResultClick = (productId) => {
        navigate(`/products/${productId}`);
        setShowDropdown(false);
        setSearchTerm('');
    };

    const clearSearch = () => {
        setSearchTerm('');
        setResults([]);
        setShowDropdown(false);
    };

    return (
        <div className="search-bar-container" ref={searchRef}>
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => results.length > 0 && setShowDropdown(true)}
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            className="clear-btn"
                            onClick={clearSearch}
                        >
                            <FaTimes />
                        </button>
                    )}
                    <button type="submit" className="search-submit-btn">
                        Search
                    </button>
                </div>
            </form>

            {/* Dropdown Results */}
            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        className="search-dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {loading ? (
                            <div className="search-loading">
                                <div className="spinner"></div>
                                <p>Searching...</p>
                            </div>
                        ) : results.length > 0 ? (
                            <>
                                <div className="search-results">
                                    {results.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            className="search-result-item"
                                            onClick={() => handleResultClick(product.id)}
                                            whileHover={{ backgroundColor: '#f8f9fa' }}
                                        >
                                            <img
                                                src={product.thumbnail || product.images?.[0]}
                                                alt={product.title}
                                                className="result-image"
                                            />
                                            <div className="result-info">
                                                <h4>{product.title}</h4>
                                                <p className="result-price">${product.price}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="search-footer">
                                    <button
                                        className="view-all-btn"
                                        onClick={() => {
                                            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        View All Results
                                    </button>
                                </div>
                            </>
                        ) : searchTerm.trim().length >= 2 ? (
                            <div className="no-results">
                                <p>No products found for "{searchTerm}"</p>
                            </div>
                        ) : null}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default SearchBar;


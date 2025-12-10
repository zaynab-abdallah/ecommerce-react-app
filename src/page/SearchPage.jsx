import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SlideProduct from '../components/slideProducts/SlideProduct';
import PageTransition from '../components/PageTransition';
import './SearchPage.css';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query.trim()) {
            performSearch(query);
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [query]);

    const performSearch = async (searchQuery) => {
        setLoading(true);
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
            const data = await response.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error('Search error:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <PageTransition>
                <div className="search-page">
                    <div className="container">
                        <motion.div 
                            className="search-loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="loader"></div>
                            <p>Searching for "{query}"...</p>
                        </motion.div>
                    </div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="search-page">
                <div className="container">
                    

                    {products.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <SlideProduct
                                data={products}
                                title={`Results for "${query}"`}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            className="no-results-message"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="no-results-icon">🔍</div>
                            <h2>No products found</h2>
                            <p>Try searching with different keywords</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </PageTransition>
    );
}

export default SearchPage;


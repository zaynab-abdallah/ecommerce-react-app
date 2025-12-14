import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Product from '../components/slideProducts/Product';
import PageTransition from '../components/PageTransition';
import './CategoryPage.css';

function CategoryPage() {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch(`https://dummyjson.com/products/category/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products || []);
                setCategoryName(slug.replace(/-/g, ' '));
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching category products:', error);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <PageTransition>
                <div className="category-page">
                    <div className="container">
                        <motion.div 
                            className="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="loader"></div>
                            <p>Loading products...</p>
                        </motion.div>
                    </div>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="category-page">
                <div className="container">
                    {/* Category Header */}

             
                    <motion.div
    className="category-header"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
>
    <nav className="breadcrumb">
        <a href="/">Home</a>
        <span>&gt;</span>
        

        {/* H1 جوه الـ Breadcrumb */}
        <p className="category-title">{categoryName}</p>
    </nav>

    <p className="category-count">
        {products.length} {products.length === 1 ? 'Product' : 'Products'}
    </p>
</motion.div>


                    {/* Products Grid */}
                    {products.length > 0 ? (
                        <motion.div 
                            className="products-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {products.map((product, index) => (
                                <Product 
                                    key={product.id} 
                                    item={product} 
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="no-products"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <p>No products found in this category.</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </PageTransition>
    );
}

export default CategoryPage;


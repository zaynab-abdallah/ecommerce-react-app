import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Product from '../components/slideProducts/Product';
import PageTransition from '../components/PageTransition';
import './Accessories.css';

// الفئات الخاصة بالإكسسوارات
const ACCESSORY_CATEGORIES = [
  'mobile-accessories',
  'sports-accessories',
  'sunglasses',
];

function Accessories() {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const results = await Promise.all(
          ACCESSORY_CATEGORIES.map(async (category) => {
            const res = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await res.json();
            return data.products || [];
          })
        );
        
        // دمج جميع المنتجات
        const allAccessories = results.flat();
        setAccessories(allAccessories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accessories:', error);
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  if (loading) {
    return (
      <PageTransition>
        <div className="accessories-page">
          <div className="container">
            <div className="loading">
              <div className="loader"></div>
              <p>Loading accessories...</p>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="accessories-page">
        <div className="container_accessories">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">></span>
            <span className="breadcrumb-current">Accessories</span>
          </nav>
          
          {/* Header */}
          <motion.div
            className="accessories-header"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="accessories-title"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span 
                className="title-gradient"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Accessories
              </motion.span>
            </motion.h1>
            <p className="accessories-subtitle">
              Discover a hand-picked selection of modern and premium accessories 
              designed to upgrade your tech lifestyle.
            </p>
            <p className="accessories-count">
              {accessories.length} Products Available
            </p>
          </motion.div>

          {/* Products Grid */}
          {accessories.length > 0 ? (
            <motion.div
              className="accessories-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {accessories.map((product, index) => (
                <Product
                  key={product.id}
                  item={product}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="no-accessories"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p>No accessories found at the moment.</p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Accessories;

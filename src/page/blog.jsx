import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import "./Blog.css";

function Blog() {
  const posts = [
    {
      id: 1,
      title: "Top 5 Must-Have Tech Accessories in 2025",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=250&fit=crop",
      description:
        "Discover the most popular and essential tech accessories that make your digital lifestyle easier and more enjoyable.",
      date: "Dec 5, 2025"
    },
    {
      id: 2,
      title: "How to Choose the Perfect Smartphone",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop",
      description:
        "Buying a new phone? Here's what to look for in performance, battery life, and camera quality.",
      date: "Dec 3, 2025"
    },
    {
      id: 3,
      title: "Why Smartwatches Became So Popular",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=250&fit=crop",
      description:
        "Smartwatches have taken over the tech world — but what makes them so useful and trendy?",
      date: "Nov 28, 2025"
    },
  ];

  return (
    <PageTransition>
      <div className="blog_page">
        <div className="container_blog">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Blog</span>
          </nav>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="blog_title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span 
                className="title-gradient"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Latest Tech News
              </motion.span>
              <motion.span 
                className="title-main"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
               
              </motion.span>
            </motion.h1>
            <p className="blog_subtitle">
              Stay updated with the newest trends, tips, and insights in modern technology.
            </p>
          </motion.div>

          <div className="blog_grid">
            {posts.map((post, index) => (
              <motion.div 
                className="blog_card" 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className="blog_image_wrapper">
                  <img src={post.image} alt={post.title} />
                  <span className="blog_date">{post.date}</span>
                </div>

                <div className="blog_content">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>

                  <Link to={`/blog/${post.id}`}>
                    <motion.button 
                      className="blog_btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read More →
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Blog;

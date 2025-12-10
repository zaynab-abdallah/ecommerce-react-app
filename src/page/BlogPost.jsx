import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaClock, FaUser } from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import "./BlogPost.css";

function BlogPost() {
  const { id } = useParams();

  // بيانات المقالات (في الواقع تُجلب من API)
  const posts = {
    1: {
      title: "Top 5 Must-Have Tech Accessories in 2025",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=450&fit=crop",
      date: "Dec 5, 2025",
      author: "Tech Writer",
      content: `
        <p>In today's fast-paced digital world, having the right accessories can make all the difference in your tech experience. Here are the top 5 must-have tech accessories for 2025:</p>
        
        <h2>1. Wireless Charging Pad</h2>
        <p>Say goodbye to tangled cables! Wireless charging pads offer convenience and efficiency. Simply place your device on the pad and watch it power up.</p>
        
        <h2>2. Noise-Cancelling Headphones</h2>
        <p>Whether you're working from home or traveling, noise-cancelling headphones provide immersive audio quality and help you focus.</p>
        
        <h2>3. Portable Power Bank</h2>
        <p>Never run out of battery again. A high-capacity power bank ensures your devices stay charged throughout the day.</p>
        
        <h2>4. Smart Watch</h2>
        <p>Track your fitness, manage notifications, and stay connected with a stylish smartwatch.</p>
        
        <h2>5. USB-C Hub</h2>
        <p>Expand your connectivity options with a multi-port USB-C hub, perfect for laptops and tablets.</p>
        
        <p><strong>Conclusion:</strong> These accessories enhance productivity and make your digital lifestyle more enjoyable. Invest in quality tech accessories today!</p>
      `
    },
    2: {
      title: "How to Choose the Perfect Smartphone",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=450&fit=crop",
      date: "Dec 3, 2025",
      author: "Mobile Expert",
      content: `
        <p>Choosing the right smartphone can be overwhelming with so many options available. Here's a comprehensive guide to help you make the best decision:</p>
        
        <h2>Performance</h2>
        <p>Look for processors like Snapdragon 8 Gen 3 or Apple A17 for smooth multitasking and gaming.</p>
        
        <h2>Camera Quality</h2>
        <p>Megapixels aren't everything. Check for features like optical image stabilization, night mode, and AI enhancements.</p>
        
        <h2>Battery Life</h2>
        <p>Aim for at least 4000mAh battery capacity with fast charging support for all-day usage.</p>
        
        <h2>Display</h2>
        <p>AMOLED screens offer vibrant colors and deep blacks. Consider 120Hz refresh rate for smoother scrolling.</p>
        
        <p><strong>Final Tip:</strong> Set your budget first and prioritize features that matter most to you!</p>
      `
    },
    3: {
      title: "Why Smartwatches Became So Popular",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=450&fit=crop",
      date: "Nov 28, 2025",
      author: "Wearables Specialist",
      content: `
        <p>Smartwatches have revolutionized the way we interact with technology. Here's why they've become essential:</p>
        
        <h2>Health & Fitness Tracking</h2>
        <p>Monitor your heart rate, steps, calories, and even sleep patterns all from your wrist.</p>
        
        <h2>Notifications at a Glance</h2>
        <p>Stay connected without constantly checking your phone. Get calls, messages, and app alerts instantly.</p>
        
        <h2>Convenience</h2>
        <p>Control music, make payments, and use voice assistants - all without pulling out your phone.</p>
        
        <h2>Style Statement</h2>
        <p>Modern smartwatches are fashion accessories that complement any outfit.</p>
        
        <p><strong>The Future:</strong> With advancing technology, smartwatches will become even more integrated into our daily lives!</p>
      `
    }
  };

  const post = posts[id] || posts[1];

  return (
    <PageTransition>
      <div className="blogpost-page">
        <div className="container_blogpost">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/blog" className="back-btn">
              <FaArrowLeft /> Back to Blog
            </Link>
          </motion.div>

          {/* Post Header */}
          <motion.div
            className="post-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span><FaClock /> {post.date}</span>
              <span><FaUser /> {post.author}</span>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            className="post-image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img src={post.image} alt={post.title} />
          </motion.div>

          {/* Post Content */}
          <motion.div
            className="post-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back to Blog */}
          <motion.div
            className="post-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/blog" className="btn-back-blog">
              ← Back to All Articles
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

export default BlogPost;


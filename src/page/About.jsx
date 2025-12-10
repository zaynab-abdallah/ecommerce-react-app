import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import "./About.css";

export default function About() {
  return (
    <PageTransition>
      <div className="about-page">
        <div className="container_about">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">About</span>
          </nav>
          
          {/* Hero Section */}
          <section className="about-hero">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="about-title"
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
                  About Us:
                </motion.span>
                <motion.span 
                  className="title-main"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Your Destination for Modern Devices
                </motion.span>
              </motion.h1>
              <p className="about-description">
                Our store offers the latest devices and smart accessories with exceptional technical support,
                fast shipping, and a clear return policy. Our goal is to make your shopping experience
                easy, safe, and enjoyable.
              </p>

              <ul className="features-list">
                <li className="feature-item">
                  <span className="check-icon">✔</span>
                  <span>100% Authentic Products</span>
                </li>
                <li className="feature-item">
                  <span className="check-icon">✔</span>
                  <span>Fast & Secure Shipping</span>
                </li>
                <li className="feature-item">
                  <span className="check-icon">✔</span>
                  <span>Pre & Post-Sale Support</span>
                </li>
                <li className="feature-item">
                  <span className="check-icon">✔</span>
                  <span>Clear Return Policy</span>
                </li>
              </ul>

              <div className="cta-buttons">
                <Link to="/" className="btn-primary">
                  Browse Products
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="hero-image"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="image-card">
                <img
                  src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=420&fit=crop"
                  alt="latest devices"
                />
                <div className="image-caption">
                  <h3>Latest Devices</h3>
                  <p>A curated collection of phones, laptops, and accessories.</p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Stats */}
          <motion.section
            className="stats-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="stat-card">
              <p className="stat-number">+4,200</p>
              <p className="stat-label">Happy Customers</p>
            </div>
            <div className="stat-card">
              <p className="stat-number">150+</p>
              <p className="stat-label">Available Products</p>
            </div>
            <div className="stat-card">
              <p className="stat-number">3</p>
              <p className="stat-label">Years of Service Warranty</p>
            </div>
          </motion.section>

          {/* Story Timeline */}
          <motion.section
            className="story-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="section-title">Our Story</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-badge">2019</div>
                <div className="timeline-content">
                  <h3>The Beginning</h3>
                  <p>We started as a small team believing in making technology accessible to everyone.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">2021</div>
                <div className="timeline-content">
                  <h3>Growth</h3>
                  <p>We expanded and added a wide selection of international brands.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-badge">2024</div>
                <div className="timeline-content">
                  <h3>The Future</h3>
                  <p>We continue to expand to always bring you the best.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Values & Team */}
          <motion.section
            className="values-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="values-card">
              <h2 className="section-title">Our Values</h2>
              <ul className="values-list">
                <li>Transparency in Dealing</li>
                <li>Fast & Effective Service</li>
                <li>Commitment to Quality</li>
                <li>Customer Satisfaction First</li>
              </ul>
            </div>

            <div className="team-card">
              <img
                src="https://ui-avatars.com/api/?name=Zainab+Abdullah&size=120&background=0090f0&color=fff"
                alt="founder"
                className="founder-image"
              />
              <h3 className="founder-name">Zainab Abdullah</h3>
              <p className="founder-title">Founder & Store Manager</p>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            className="cta-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="cta-content">
              <h3>Ready to Get Started?</h3>
              <p>Browse our collection and choose your favorite device now.</p>
            </div>
            <div className="cta-buttons">
              <Link to="/" className="btn-primary">Shop Now</Link>
              <Link to="/contact" className="btn-secondary">Contact Us</Link>
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
}

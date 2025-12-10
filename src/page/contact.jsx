import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <PageTransition>
      <div className="contact_page">
        <div className="container_contact">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-current">Contact</span>
          </nav>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="contact_title"
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
                Contact Us
              </motion.span>
            </motion.h1>
            <p className="contact_subtitle">
              We're here to help! Please reach out if you have any questions, feedback, or inquiries.
            </p>
          </motion.div>

          <div className="contact_container">
            {/* Contact Form */}
            <motion.form 
              className="contact_form" 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label>Your Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <motion.button 
                type="submit" 
                className="contact_btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </motion.form>

            {/* Contact Info */}
            <motion.div 
              className="contact_info"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3>Get in Touch</h3>

              <div className="info_item">
                <FaEnvelope className="info_icon" />
                <div>
                  <strong>Email</strong>
                  <p>support@modern-devices.com</p>
                </div>
              </div>

              <div className="info_item">
                <FaPhone className="info_icon" />
                <div>
                  <strong>Phone</strong>
                  <p>+1 (555) 987-1234</p>
                </div>
              </div>

              <div className="info_item">
                <FaMapMarkerAlt className="info_icon" />
                <div>
                  <strong>Address</strong>
                  <p>Modern Tech Store<br />Cairo, Egypt</p>
                </div>
              </div>

              <h3 style={{ marginTop: '30px' }}>
                <FaClock style={{ marginRight: '10px', color: 'var(--main-color)' }} />
                Working Hours
              </h3>
              <p>Saturday – Thursday<br />10:00 AM – 9:00 PM</p>
              <p style={{ color: '#d9534f', fontWeight: '600' }}>Friday: Closed</p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Contact;

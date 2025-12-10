import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import "./SignIn.css";

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      alert(`Account created successfully for ${formData.email}!`);
    } else {
      alert(`Welcome back, ${formData.email}!`);
    }
    navigate("/");
  };

  return (
    <PageTransition>
      <div className="signin-page">
        <div className="signin-container">
          <motion.div
            className="signin-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="signin-header">
              <h1>{isSignUp ? "Create Account" : "Welcome Back"}</h1>
              <p>
                {isSignUp
                  ? "Sign up to start shopping"
                  : "Sign in to your account"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="signin-form">
              {isSignUp && (
                <div className="form-group">
                  <label>
                    <FaUser className="input-icon" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>
                  <FaEnvelope className="input-icon" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FaLock className="input-icon" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>

              {!isSignUp && (
                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot Password?
                  </Link>
                </div>
              )}

              <motion.button
                type="submit"
                className="signin-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </motion.button>
            </form>

            {/* Toggle */}
            <div className="signin-toggle">
              <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setFormData({ name: "", email: "", password: "" });
                  }}
                  className="toggle-btn"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>

            {/* Social Login */}
            <div className="social-login">
              <div className="divider">
                <span>OR</span>
              </div>
              <button className="social-btn google">
                Continue with Google
              </button>
              <button className="social-btn facebook">
                Continue with Facebook
              </button>
            </div>
          </motion.div>

          {/* Side Image */}
          <motion.div
            className="signin-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="image-content">
              <h2>Shop the Latest Tech</h2>
              <p>Discover amazing products and exclusive deals</p>
              <div className="features">
                <div className="feature">✓ Secure Payments</div>
                <div className="feature">✓ Fast Shipping</div>
                <div className="feature">✓ 24/7 Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

export default SignIn;


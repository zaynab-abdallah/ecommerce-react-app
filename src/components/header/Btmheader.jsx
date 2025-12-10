import React, { useState, useEffect } from 'react';
import { IoMdMenu, IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const NavLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Accessories", link: "/accessories" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
];

function Btmheader() {

  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // إغلاق القوائم عند تغيير الصفحة
  useEffect(() => {
    const closeMenus = () => {
      setIsMobileMenuOpen(false);
      setIsCategoryOpen(false);
    };
    closeMenus();
  }, [location.pathname]);

  return (
    <div className='btm_header'>
      <div className="container">
        
        {/* Browse Category - Always visible in bottom header */}
        <div
          className="category_btn"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <IoMdMenu />
          <p>Browse Category</p>
          <motion.div
            animate={{ rotate: isCategoryOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <IoMdArrowDropdown />
          </motion.div>
        </div>

        {/* Category Dropdown - Always visible in bottom header */}
        <AnimatePresence mode="wait">
          {isCategoryOpen && (
            <motion.div 
              className="category_nav_list active"
              initial={{ 
                opacity: 0, 
                scaleY: 0,
                transformOrigin: "top"
              }}
              animate={{ 
                opacity: 1, 
                scaleY: 1,
                transition: {
                  duration: 0.2,
                  ease: [0.4, 0, 0.2, 1],
                  staggerChildren: 0.03,
                  delayChildren: 0.05
                }
              }}
              exit={{ 
                opacity: 0, 
                scaleY: 0,
                transition: {
                  duration: 0.15,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  <Link 
                    to={`/category/${category.slug}`}
                    onClick={() => {
                      setIsCategoryOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {category.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
        
        {/* Mobile Sidebar Menu - Only navigation links */}
        <nav className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav_links">
            {NavLinks.map((item) => (
              <li
                key={item.title}
                className={location.pathname === item.link ? 'active' : ''}
              >
                <Link 
                  to={item.link}
                  onClick={() => {
                    setIsCategoryOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        {/* Sign In/Sign Up Icons - Always visible in bottom header */}
        <div className="sign_regs_icon">
          <Link 
            to="/signin" 
            title="Sign In"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <PiSignInBold />
          </Link>
          <Link 
            to="/signin" 
            title="Sign Up"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaUserPlus />
          </Link>
        </div>
        </nav>

        {/* Overlay للموبايل */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

      </div>
    </div>
  );
}

export default Btmheader;


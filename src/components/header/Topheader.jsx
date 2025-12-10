import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import SearchBar from "../Search/SearchBar";
import "./header.css";

const Topheader = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  
  // حساب عدد المنتجات في السلة
  const cartCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  
  // عدد المفضلة
  const favoritesCount = favorites ? favorites.length : 0;

  return (
    <div className="top_header">
      <div className="container">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>

        <SearchBar />

        <div className="header_icons">
          <Link to="/favorites" className="icon">
            <FaRegHeart />
            <span className="count">{favoritesCount}</span>
          </Link>
          <Link to="/cart" className="icon">
            <TiShoppingCart />
            <span className="count">{cartCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topheader;

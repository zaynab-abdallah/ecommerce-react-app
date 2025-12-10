import Topheader from "./components/header/Topheader";
import Btmheader from "./components/header/Btmheader";
import Home from "./page/Home";
import About from "./page/About";
import Accessories from "./page/Accessories";
import Blog from "./page/blog";
import BlogPost from "./page/BlogPost";
import Contact from "./page/contact";
import SignIn from "./page/SignIn";
import "../src/page/Home.css";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./page/productDetails/ProductDetails.jsx";
import CartPage from "./components/context/CartPage";
import CategoryPage from "./page/CategoryPage";
import SearchPage from "./page/SearchPage";
import FavoritesPage from "./page/FavoritesPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <header>
        <Topheader />
        <Btmheader />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;

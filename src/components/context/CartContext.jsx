import { createContext, useContext, useState, useEffect } from "react";
import CartToast from "../Toast/CartToast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ⭐ تحميل البيانات من localStorage مباشرة عند التهيئة
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  const [toastProduct, setToastProduct] = useState(null);

  // ⭐ حفظ السلة في localStorage عند أي تغيير
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        // إذا كان موجود، زيادة الكمية
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // إذا لم يكن موجود، إضافته بكمية 1
      return [...prev, { ...product, quantity: 1 }];
    });

    // إظهار Toast
    setToastProduct(product);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // لا تسمح بكمية أقل من 1
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const incrementQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider value={{ 
      cart: cartItems, 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      isInCart,
      updateQuantity,
      incrementQuantity,
      decrementQuantity
    }}>
      {children}
      {toastProduct && (
        <CartToast 
          product={toastProduct} 
          onClose={() => setToastProduct(null)}
        />
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

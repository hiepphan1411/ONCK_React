import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <Link to="/cart" className="relative inline-block bg-green-400 px-2 py-1 rounded-full hover:bg-green-500 hover:text-white">
      <div className="p-2 rounded-full">
        Giỏ hàng
        {cartCount > 0 && (
          <span> ({cartCount})</span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Giỏ hàng đang rỗng</h2>
        <p className="mb-4">Sản phẩm bạn thêm vào giỏ hàng sẽ xuất hiện tại đây!</p>
        <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>
      
      <div className="bg-white rounded shadow-md mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="border-b p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
              <div>
                <Link to={`/product/${item.id}`} className="text-lg font-semibold hover:text-blue-500">
                  {item.name}
                </Link>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center border rounded">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="px-3 py-1">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              
              <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
              
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <button 
          onClick={clearCart}
          className="bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded"
        >
          Clear Cart
        </button>
        
        <div className="text-right">
          <div className="text-lg">
            Total: <span className="font-bold">${getCartTotal().toFixed(2)}</span>
          </div>
          <button className="mt-3 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
            Checkout
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;

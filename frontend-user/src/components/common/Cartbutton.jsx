import { useState } from 'react';

function CartButton({ cartItems = [], removeFromCart }) {
  const [showCart, setShowCart] = useState(false);
  const cartCount = cartItems.length;

  const toggleShow = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="relative flex">
      <button 
        onClick={toggleShow}
        className="relative hover:text-gray-300 transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {cartCount}
          </span>
        )}
      </button>
      {/* Cart Dropdown */}
      {showCart && cartItems.length > 0 && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 z-50">
          <h3 className="text-lg font-bold mb-4">Votre Panier ({cartCount} films)</h3>
          <ul className="space-y-3">
            {cartItems.map(item => (
              <li 
                onDoubleClick={() => removeFromCart && removeFromCart(item.id)}
                key={item.id} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                <div className="flex items-center space-x-3">
                  <img src={item.poster} alt={item.title} className="w-12 h-16 object-cover rounded" />
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-primary text-sm">{item.price} €</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CartButton;

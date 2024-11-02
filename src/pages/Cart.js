import React, { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { user, carts, setToCart } = useContext(UserContext);

  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value);
    setToCart((prevCarts) => prevCarts.map((item) => item.id === productId ? { ...item, quantity: newQuantity } : item ));
  };

  useEffect(() => {
    if (!user) navigate('/login');
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="m-10">
      {carts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Cart is empty</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {carts.map((item) => (
            <div className="bg-white rounded-lg shadow-md h-96 p-5">
              <div className="h-48">
                <img src={item?.imgSrc} alt="Product" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="flex items-center justify-between mt-10">
                <p className="font-bold text-xl">${item.price * item.quantity}</p>
                <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(e, item.id)} min="1" className="w-14 text-xl border-black border-2 rounded-lg ps-2 shadow-md"/>
              </div>
              <button className="text-center bg-gray-800 text-white w-full mt-5 py-3 rounded-lg hover:bg-gray-600">
                Check Out
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;

import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Shop = () => {
  const navigate = useNavigate();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { user, addToCart, products, carts } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoriesSelect = (category) => {
    setSelectedCategory(category);
    setCategoriesOpen(false);
  };

  const cartPage = () => {
    navigate("/cart");
  };

  const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {
    if (!user) navigate('/login');
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className=''>
      <div className='relative flex justify-between bg-white items-center sm:p-5 py-4 px-1 shadow-lg'>
        <div className='w-28'>
          <div className='flex sm:text-xl text-sm items-center justify-center cursor-pointer gap-2' onClick={() => setCategoriesOpen(!categoriesOpen)}>
            <p>Categories</p>
            <i className="fa-solid fa-caret-down"></i>
          </div>
          {categoriesOpen && (
            <div className='flex flex-col items-center gap-1 py-3 transition-all z-10 duration-300 absolute left-5 top-30 rounded-md bg-gray-200 w-28'>
              <div className='hover:bg-slate-300 cursor-pointer px-5 w-full' onClick={() => categoriesSelect('all')}>All</div>
              <div className='hover:bg-slate-300 cursor-pointer px-5 w-full' onClick={() => categoriesSelect('trouser')}>Cloth</div>
              <div className='hover:bg-slate-300 cursor-pointer px-5 w-full' onClick={() => categoriesSelect('shoe')}>Shoes</div>
              <div className='hover:bg-slate-300 cursor-pointer px-5 w-full' onClick={() => categoriesSelect('wristwatch')}>Watches</div>
              <div className='hover:bg-slate-300 cursor-pointer px-5 w-full' onClick={() => categoriesSelect('electronic')}>Electronics</div>
            </div>
          )} 
        </div>
        <div className='w-1/2 flex items-center'>
          <input type="text" className='bg-gray-200 sm:ps-5 ps-2 h-10 rounded-l-lg w-2/3' placeholder='search products' />
          <i className="fa-solid fa-magnifying-glass bg-gray-200 rounded-r-lg h-10 flex justify-center items-center p-2 cursor-pointer border-l-2 border-slate-300"></i>
        </div>
        <div className='flex items-center gap-1 cursor-pointer' onClick={cartPage}>
          <Link><i className="fa-solid fa-cart-shopping"></i></Link>
          <div className='w-5 h-5 border-2 text-sm font-bold flex justify-center items-center rounded-lg'>
            <p className='text-red-600'>{carts?.length}</p>
          </div>
        </div>
      </div>
      {loading ? <Loading /> :
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white w-full rounded-lg shadow-md h-80 p-5">
              <div className="h-48">
                <img src={product.imgSrc} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="flex items-center justify-between mt-10">
                <p className='font-bold text-xl'>${product.price}</p>
                <button className="bg-gray-800 hover:bg-gray-600 text-sm sm:text-lg px-1 text-white py-1 rounded-sm w-28" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      }
    </div>
  )
}

export default Shop;

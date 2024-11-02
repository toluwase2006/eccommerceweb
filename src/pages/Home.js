import React, { useEffect, useState , useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import suits from '../assets/istockphoto-643881848-1024x1024.jpg';
import shoes from '../assets/how-many-pairs-of-shoes-is-too-many-v0-otuuwwtist1c1.webp';
import bags from '../assets/suitcases_1600x.webp';
import { UserContext } from '../context/userContext';




const Home = () => {
  const navigate = useNavigate()
  const [categoriesOpen, setCategoriesOpen] = useState(false); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { user, carts} = useContext(UserContext);

  const categoriesSelect = () => {

    if (user) {
      navigate("/shop")
    } else {
      navigate("/login")
    }
    setCategoriesOpen(!categoriesOpen)
  }
  const cartPage = () => {
    if (user) {
      navigate("/cart")
    } else {
      navigate("/login")
    }
  }
  const arrayImages = [
    { 
      imgSrc: suits, 
      label: 'SUITS' 
    },
    { 
      imgSrc: shoes, 
      label: 'SHOES' 
    },
    {
      imgSrc:bags, 
      label:'BAGS'
    },

  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex) => (currentImageIndex + 1) % arrayImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [arrayImages.length]);

  return (
    <div className='' >
      <div className=' relative flex justify-between items-center sm:p-5 pt-4 px-1'>
        <div className='w-28'>
          <div className='flex sm:text-xl text-sm items-center justify-center cursor-pointer gap-2' onClick={() => setCategoriesOpen(!categoriesOpen)}>
            <p>Categories</p>
            <i className="fa-solid fa-caret-down"></i>
          </div>
          {categoriesOpen && (
            <div className='flex flex-col items-center gap-1 py-3 transition-all duration-300 absolute left-5 top-30 rounded-md bg-gray-200 w-28'>
              <div className='hover:bg-slate-300 cursor-pointer px-5 w-full' onClick={categoriesSelect}>Cloth</div>
              <div className='hover:bg-slate-300 cursor-pointer px-5 w-full' onClick={categoriesSelect}>Shoes</div>
              <div className='hover:bg-slate-300 cursor-pointer px-5 w-full' onClick={categoriesSelect}>Watches</div>
              <div className='hover:bg-slate-300 cursor-pointer px-5 w-full' onClick={categoriesSelect}>Electronics</div>
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

      <div className={`w-full  mt-2 h-5 flex flex-col items-center justify-center text-center transition-opacity duration-500`} style={{backgroundImage: `url(${arrayImages[currentImageIndex].imgSrc})`,backgroundSize: 'cover',backgroundPosition: 'center', height:'90vh'}}>
        <p className='text-4xl text-white font-bold'>{arrayImages[currentImageIndex].label}</p>
        <p className='text-white mt-4 w-4/5'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <Link to='/shop'>
          <button className='bg-gray-800 text-white py-2 px-4 mt-5 rounded-lg hover:bg-gray-600'>
            GO SHOPPING
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Navbar = () => {
    const [navOpen, setOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const navigate = useNavigate();
    
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <div className='flex justify-between items-center bg-gray-800 px-5 text-white border-b-2 border-yellow-700 sticky inset-0 sm:px-10 py-5 z-20'>
            <h2 className='text-3xl'>E<span className='text-yellow-700 font-bold'>SHOP</span></h2>

            <div className='hidden sm:inline-flex gap-4 text-xl items-center relative'>
                {user ? (
                    <>
                        <div className='flex relative items-center gap-3 cursor-pointer' onClick={() => setLogoutOpen(!logoutOpen)} >
                            <p className="text-white">{user?.name}</p>
                            <i className="fa-solid fa-caret-down"></i>
                            {logoutOpen && (
                                <div className='absolute top-7 left-5 bg-gray-800 text-center hover:bg-gray-600 text-white rounded-lg w-32 shadow-lg py-2 px-4 z-30'>
                                    <button onClick={handleLogout} className='cursor-pointer block '>Log Out</button>
                                </div>
                            )}
                        </div>
                        <Link to="/">Home</Link>
                        <Link to="/shop">Shop</Link>
                    </>
                ) : (
                    <Link to="/login" className='text-xl'>
                        <i className="fa-solid fa-image-portrait"></i> Login
                    </Link>
                )}
            </div>

            <i className={`fa-solid ${!navOpen ? 'fa-bars' : 'fa-xmark'} text-2xl sm:hidden cursor-pointer`} onClick={() => setOpen(!navOpen)}></i>

            {navOpen && (
                <div className='absolute left-0 top-16 w-full bg-gray-800 border-b-2 border-yellow-700 z-10 flex flex-col items-center gap-4 text-xl text-white py-5'>
                    {user ? (
                        <>
                            <div className='flex relative items-center gap-3 cursor-pointer' onClick={() => setLogoutOpen(!logoutOpen)} >
                                <p className="text-white">{user?.name}</p>
                                <i className="fa-solid fa-caret-down"></i>
                                {logoutOpen && (
                                    <div className='absolute top-7 left-10 bg-gray-800 text-center hover:bg-gray-600 text-white rounded-lg w-32 shadow-lg py-2 px-4 z-20'>
                                        <button onClick={handleLogout} className='cursor-pointer block text-left'>Log Out</button>
                                    </div>
                                )}
                            </div>
                            <Link to="/" onClick={() => setOpen(!navOpen)}>Home</Link>
                            <Link to="/shop" onClick={() => setOpen(!navOpen)}>Shop</Link>
                        </>
                    ) : (
                        <Link to="/login" onClick={() => setOpen(!navOpen)}>Login</Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;

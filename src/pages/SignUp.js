import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const navigate = useNavigate();
    const [passwordLock, setPasswordLock] = useState(true);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const baseUrl = "http://localhost:5000/users"

    const handleRegisterClick = (e) => {
        e.preventDefault()

        if (name.length === 0 && username.length === 0 && email.length === 0 && password.length === 0) {
            toast.error("Fill in all the fields", { toastId: "1" })

        } else {
            const user = { name, username, email, password }
            RegisterUser(user)
            navigate("/login")
        }


    }


    function RegisterUser(user) {
        fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success("User registration successful!")
            })

    }


    return (
        <div className="h-80vh flex my-16 justify-center items-center">
            <div className="text-center">
                <p className='pb-5 font-bold text-xl'>Register</p>
                <form onSubmit={handleRegisterClick} className="mt-2-auto">
                    <div className="flex mb-5">
                        <i className="fa-solid fa-image-portrait border-2 text-2xl flex justify-center text-gray-800 items-center rounded-l-lg bg-slate-400 border-slate-400 h-11 px-4"></i>
                        <input type="text" className="border-2 border-slate-400 w-10/12 sm:w-11/12 p-2 rounded-r-lg" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                    </div>
                    <div className="flex mb-5">
                        <i className="fa-solid fa-image-portrait border-2 text-2xl flex justify-center text-gray-800 items-center rounded-l-lg bg-slate-400 border-slate-400 h-11 px-4"></i>
                        <input type="text" className="border-2 border-slate-400 w-10/12 sm:w-11/12 p-2 rounded-r-lg" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your Username" />
                    </div>
                    <div className="flex mb-5">
                        <i className="fa-solid fa-envelope border-2 text-lg flex justify-center text-gray-800 items-center rounded-l-lg bg-slate-400 border-slate-400 h-11 px-4"></i>
                        <input type="email" className="border-2 border-slate-400 w-10/12 sm:w-11/12 p-2 rounded-r-lg" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" />
                    </div>
                    <div className='flex items-center'>
                        <i className="fa-solid fa-lock border-2 text-2xl text-gray-800 flex justify-center items-center rounded-l-lg bg-slate-400 border-slate-400 h-11 px-4"></i>
                        <input type={passwordLock ? 'password' : 'text'} value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 text-gray-800 border-slate-400 w-44 sm:w-96 p-2" placeholder="Your Password" />
                        <i className={`fa-solid ${passwordLock ? 'fa-eye-slash' : 'fa-eye'} border-2 text-lg flex justify-center cursor-pointer items-center rounded-r-lg bg-slate-400 border-slate-400 h-11 px-4`} onClick={() => setPasswordLock(prev => !prev)}></i>
                    </div>
                    <button type='submit' className='bg-gray-800 hover:bg-gray-700 mt-5 w-full py-3 rounded-lg text-xl text-white font-bold'>
                        Register
                    </button>
                    <div className='flex gap-2 mt-5'>
                        <p>You have an account?</p>
                        <Link to='/login' className='text-red-700'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;

import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const Login = () => {
  const { loginUser } = useContext(UserContext)
  const [passwordLock, setPasswordLock] = useState(true)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')



  const handleLoginEvent = (e) => {
    e.preventDefault()
    if (name.length === 0 && password.length === 0) {
      toast.error("Fill in all the fields!")
    } else {

      loginUser(name, password)

    }
  }




  return (
    <div className="h-80vh flex my-32 justify-center items-center">
      <div className="text-center">
        <p className='pb-5 font-bold text-xl'>Login</p>
        <form action="" onSubmit={handleLoginEvent} className="mt-2-auto">
          <div className="flex mb-5">
            <i className="fa-solid fa-image-portrait border-2 text-2xl flex justify-center text-gray-800 items-center rounded-l-lg bg-slate-400 border-slate-400 h-11 px-4"></i>
            <input type="text" className="border-2 border-slate-400 w-10/12 sm:w-11/12 p-2 rounded-r-lg" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div className='flex items-center'>
            <i className="fa-solid fa-lock border-2 text-2xl text-gray-800 flex justify-center items-center rounded-l-lg bg-slate-400 border-slate-400 h-11 px-4"></i>
            <input type={`${passwordLock ? 'password' : 'text'}`} value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 text-gray-800 border-slate-400 w-44 sm:w-96 p-2" placeholder="Your Password" />
            <i className={`fa-solid ${passwordLock ? 'fa-eye-slash' : 'fa-eye'} border-2 text-2xl flex justify-center cursor-pointer items-center rounded-r-lg bg-slate-400 border-slate-400 h-11 px-4`} onClick={() => setPasswordLock(prev => !prev)}></i>
          </div>
          <button className='bg-gray-800 hover:bg-gray-700 mt-5 w-full py-3 rounded-lg text-xl text-white font-bold'>
            Sign In
          </button>
          <div className='flex gap-2 mt-5'>
            <p>Don't have an acount?</p>
            <Link to='/signup' className='text-red-700'>Register</Link>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login

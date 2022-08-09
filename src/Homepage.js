import React, { useState } from 'react'
import background from './assets/loginPage.jpeg';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const login = (event) => {
    event.preventDefault();
    console.log(`The email and password you entered was:`, email, pwd)
    axios.post("http://localhost:8000/user/api-token-auth/",{username:email, password:pwd})
        .then(response => {
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("username", response.data.username)
          console.log(response)
          navigate('/dashboard');
        })
        .catch(error => {
          console.log("Invalid Creds")
        })
  }

  return (
    <div className='flex w-full h-screen items-center justify-center' style={{ 
      backgroundImage: `url(${background})`
    }}>
      <div className="w-full max-w-md">
        <form onSubmit={login} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className='text-center font-bold'>Login for Job Seekers</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="password" 
              type="password" 
              placeholder="******************" 
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}/>
            {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="submit">
              Sign In
            </button>
            <a href='/company-signin' className='text-sm underline hover:text-blue-500'>Sign in as a Company</a>
          </div>
          <a href='/register' className='text-sm underline hover:text-blue-500'>Register</a>

        </form>
      </div>
    </div>
  )
}

export default Homepage

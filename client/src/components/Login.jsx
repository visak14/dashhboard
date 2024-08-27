import axios from 'axios';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

export default function Login() {

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    // const setAdmin= useSetRecoilState(adminState);
    const navigate = useNavigate()

  return (
    <div className="flex h-screen w-screen">
      <div className="relative flex-1">
        <img src="/dashboardImage.png" alt="Logo" className="object-cover w-full h-full" />
      </div>

      <div className="flex-none w-full lg:w-1/3 bg-white p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-semibold text-center mb-4">Welcome to Dashboard <span role="img" aria-label="wave">👋</span></h2>
        <p className="text-center text-gray-600 mb-6">Please sign in to your account and start the adventure</p>

        <div className="bg-purple-100 p-4 rounded mb-6">
          <p className="text-gray-700"> Email: <span className="font-semibold">use always different Email</span></p>
          <p className="text-gray-700 mt-2">Password <span className="font-semibold">use always different password</span> </p>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e)=>{
                setEmail(e.target.value)
           }}

            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                id="password"
                type="password"
                placeholder="********"
                onChange={(e) =>{
                    setPassword(e.target.value)
                }} 
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m4-4h-4m2 12a9 9 0 110-18 9 9 0 010 18z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-sm text-purple-600 hover:text-purple-800">Forgot Password?</a>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-purple-600 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline hover:bg-purple-700"
              type="button"
              onClick={async() => {
                const response = await axios.post(`${BASE_URL}/signup`, {
                    username: email,
                    password: password
                })
                let data = response.data;
                localStorage.setItem("token", data.token);
                // setAdmin({adminEmail: email, isLoading: false})
                navigate("/charts")
            }}

            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

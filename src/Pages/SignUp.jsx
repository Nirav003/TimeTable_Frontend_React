import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BiLoaderCircle } from "react-icons/bi";
import { API_URL } from '../server.js';
import toast from 'react-hot-toast';
import { userDataContext } from '../Context/UserContext.jsx';

const SignUp = () => {
  
  const { user, setUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const [ loading, setLoading ] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setFormData({
       ...formData,
        [name]: value,
    })

  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/users/signup`, formData, { withCredentials: true });
      const userDetail = res.data.data.user;
      localStorage.setItem('token', res.data.token)
      setUser(userDetail);
      toast.success("SignUp Successful");
      navigate('/');
    } catch (error) {
      setError(error.response.data.error.statusCode);
      toast.error(error.response.data.error.statusCode);
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
    <div className="h-screen flex items-center justify-center bg-cover bg-center">
        <form onSubmit={handleSignUp} className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-sm w-full">
        {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Your Name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* <div className="mb-5">
            <label
              htmlFor="passwordConfirmation"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              placeholder="Enter Again Your Password"
              onChange={e => setpasswordConfirmation(e.target.value)}
            />
            </div> */}
          
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? <BiLoaderCircle className='animate-spin mx-auto' size={24} /> : "Create"}
          </button>

          <div className="flex items-start mt-5">
            
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900"
            >
            If you already have an account please <Link to='/login'><span className="text-blue-600">Login here</span> </Link>
            </label>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignUp
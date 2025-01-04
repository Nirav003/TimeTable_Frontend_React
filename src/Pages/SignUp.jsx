import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../server.js';
import toast from 'react-hot-toast';
import { userDataContext } from '../Context/UserContext.jsx';
import Loader from '../Components/Loader/Loader.jsx';

const SignUp = () => {
  
  const { user, setUser } = useContext(userDataContext);
  const { roll, setRoll } = useContext(userDataContext);
  const navigate = useNavigate();

  const [ loading, setLoading ] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    batch: "",
    year: "",
    phone: "",
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
      const userRoll = res.data.data.user.roll;
      localStorage.setItem('token', res.data.token)
      setUser(userDetail);
      setRoll(userRoll);
      toast.success("SignUp Successful");
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
    <div className="h-screen flex items-center justify-center bg-cover bg-center">
        <form onSubmit={handleSignUp} className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-sm w-full md:max-w-full md:w-3/4">
          <div className='flex items-center justify-between gap-5 w-full'>
            <div className="w-full mb-5">
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
            <div className="w-full mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
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
          </div>
          <div className='flex items-center justify-between gap-5 w-full'>
            <div className='w-full mb-5'>
              <label
                htmlFor="batch"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Batch
              </label>
              <select
                id="batch"
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                className="block w-full p-2.5 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Batch</option>
                <option value="BSc IT">BSc IT</option>
                <option value="BSc CS">BSc CS</option>
                <option value="BSc GS">BSc GS</option>
              </select>
            </div>
            <div className='w-full mb-5'>
              <label
                htmlFor="year"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Year
              </label>
              <select
                id="year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="block w-full p-2.5 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Year</option>
                <option value="FY">FY</option>
                <option value="SY">SY</option>
                <option value="TY">TY</option>
              </select>
            </div>
          </div>
          <div className='flex items-center justify-between gap-5 w-full'>
            <div className='w-full mb-5'>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Phone No
              </label>
              <input
                type="number"
                id="phone"
                number="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                placeholder="Enter Your Phone No"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-5">
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
            {loading ? <Loader /> : "Create"}
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
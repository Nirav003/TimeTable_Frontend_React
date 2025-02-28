import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../Api/server";
import { userDataContext } from "../../Context/UserContext";
import Loader from "../../Components/Loader/Loader";

function Login() {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(userDataContext)
  const { role, setRole } = useContext(userDataContext)

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
     ...formData,
      [name]: value,
    });
  };

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await axios.post(`${API_URL}/user/login`, formData, {withCredentials: true});
    const userDetail = res.data.user;
    const userRole = res.data.user.role;
    localStorage.setItem('token', res.data.token)    
    setUser(userDetail);
    setRole(userRole);
    toast.success("Login Successful");
    navigate('/home');
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <>
      <div className="h-full flex items-center justify-center bg-cover bg-center">
        <form onSubmit={handleLogin} className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-sm w-full">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.password}
              onChange={handleChange}
            />
            <Link 
              to="/forgetpassword" 
              className="text-red-500 text-right block text-sm font-medium mt-2" 
            >
              Forget Password ?
            </Link>
          </div>
          {!loading ? <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Submit
          </button> : <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
            disabled={loading}
          >
            <Loader />
          </button>}
          <div className="flex items-start mt-5">

          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            If you Don't have account please <Link to='/signup'><span className="text-blue-600">create a Account</span> </Link>
          </label>
        </div>
        </form>
      </div>
    </>
  );
}

export default Login;

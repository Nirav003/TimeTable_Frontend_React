import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImUser } from "react-icons/im";
import axios from 'axios';
import { API_URL } from '../server';
import toast from 'react-hot-toast';
import { userDataContext } from '../Context/UserContext'


const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(userDataContext);
 
  const handleLogin = () => {
    navigate('/login'); 
    setIsOpen(false); 
  };

  const handleSignup = () => {
    navigate('/signup'); 
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await axios.post(`${API_URL}/users/logout`);
    localStorage.removeItem('token')
    setUser(null)
    toast.success("Logout Successful")
    navigate('/')
    setIsOpen(false)
  };

  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current &&!dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, []);
  
  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <ImUser className="text-offwhite-light hover:text-primary-dark hover:bg-offwhite-light w-8 h-8 rounded-md" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-primary-default rounded-md shadow-lg ring-1 ring-primary-light ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {user ? (
              <>  
                  <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-primary-dark hover:bg-offwhite-dark"
                  >
                      Logout
                  </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="block w-full px-4 py-2 text-left text-sm text-primary-dark hover:bg-offwhite-dark"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="block w-full px-4 py-2 text-left text-sm text-primary-dark hover:bg-offwhite-dark"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;

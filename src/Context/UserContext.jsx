import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from '../Api/server';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${API_URL}/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });

          if (response.status === 200) {
            const data = response.data;          
            setUser(data.user);
            setRole(data.user.role);
          } else {
            handleInvalidToken();
          }
        } catch (error) {
          handleInvalidToken();
        } finally {
          setLoading(false); 
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Handle invalid/expired tokens
  const handleInvalidToken = () => {
    toast.error('Session expired. Please log in again.');
    localStorage.removeItem('token');
    setUser(null);
    setRole(null);
    navigate('/');
  };

  return (
    <userDataContext.Provider value={{ user, setUser, role, setRole, loading }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;

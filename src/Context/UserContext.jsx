import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from '../Api/server';
import toast from 'react-hot-toast';

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  
  const [user, setUser] = useState(null); 
  const [role, setRole] = useState(null);

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
            const data = await response.data;
            // console.log(data);
            setUser(data.user);
            setRole(data.user.role);
          } else {
            console.error('Invalid token');
            toast.error('Invalid token');
            localStorage.removeItem('token'); 
            setUser(null);
            setRole(null);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          toast.error(error.response.data.message);
          setUser(null);
          setRole(null);
        }
      };
      fetchUser();
    }
    

  }, []);

  return (
    <userDataContext.Provider value={{ user, setUser, role, setRole }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;

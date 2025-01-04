import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from '../server';

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
            setRole(data.user.roll);
          } else {
            console.error('Invalid token');
            localStorage.removeItem('token'); 
            setUser(null);
            setRole(null);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
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

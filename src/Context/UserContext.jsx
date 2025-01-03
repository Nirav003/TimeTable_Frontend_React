import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from '../server';

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  
  const [user, setUser] = useState(null); 
  const [roll, setRoll] = useState(null);

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
            // console.log(data.user);
            setUser(data.user);
            setRoll(data.user.roll);
          } else {
            console.error('Invalid token');
            localStorage.removeItem('token'); 
            setUser(null);
            setRoll(null);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);
          setRoll(null);
        }
      };
      fetchUser();
    }
    

  }, []);

  return (
    <userDataContext.Provider value={{ user, setUser, roll, setRoll }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;

import React, { useContext, useState } from 'react';
import Loader from '../../Components/Loader/Loader';
import { userDataContext } from '../../Context/UserContext';

const Home = () => {

  const [loading, setLoading] = useState(false);
  const { user } = useContext(userDataContext)  

  return (
    <div className=''>
      {loading ? <Loader /> : "Home"}
      {user && <div>
          <p>{user?._id}</p>
          <p>{user?.name}</p>
          <p>{user?.role}</p>
          <p>{user?.batch}</p>
          <p>{user?.year}</p>
        </div>
      }
    </div>
  )
}

export default Home
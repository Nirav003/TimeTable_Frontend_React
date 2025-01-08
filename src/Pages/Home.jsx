import React, { useContext, useState } from 'react';
import Loader from '../Components/Loader/Loader';
import { userDataContext } from '../Context/UserContext';

const Home = () => {

  const [loading, setLoading] = useState(false);
  const { user } = useContext(userDataContext)

  return (
    <div className=''>
      {loading ? <Loader /> : "Home"}
      {user && <div>
        <p>{user?.name}</p>
        <p>{user?.role}</p>
      </div>}
    </div>
  )
}

export default Home
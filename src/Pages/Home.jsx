import React, { useState } from 'react';
import Loader from '../Components/Loader/Loader';

const Home = () => {

  const [loading, setLoading] = useState(false);

  return (
    <div className=''>
      {loading ? <Loader /> : Home}
    </div>
  )
}

export default Home
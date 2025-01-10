import React, { useContext } from 'react'
import { userDataContext } from '../../Context/UserContext';
import Student from './Time Table/Student'
import Admin from './Time Table/Admin'
import Staff from './Time Table/Staff'
import Unauthorized from '../../Components/UnAuthorized/Unauthorized';

const Lecture = () => {

  const { role } = useContext(userDataContext)

  const renderComponent = () => {
    switch (role) {
      
      case 'student':
        return <Student />;
        
      case 'admin':
        return <Admin />;

      case 'staff':
        return <Staff />;
          
      default: 
        return <Unauthorized />;
    }
  }

  return (
    <div>
      <h1 className='text-3xl text-center font-bold'>Lecture Schedule</h1>
      {renderComponent()}
    </div>
  )
}

export default Lecture
import React, { useContext } from 'react'
import { userDataContext } from '../../Context/UserContext'
import Admin from './Time Table/Admin'
import Student from './Time Table/Student'

const Lecture = () => {

  const { user, roll } = useContext(userDataContext);
  
  return (
    <div>
      {roll === "admin" ? <Admin /> : <Student />}
    </div>
  )
}

export default Lecture
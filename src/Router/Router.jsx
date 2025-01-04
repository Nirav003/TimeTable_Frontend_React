import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Lecture from '../Pages/Lecture/Lecture'
import MasterData from '../Pages/MasterData'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import ProtectRoute from '../Components/ProtectRoute'
import Mapping from '../Pages/Mapping/Mapping'
import { userDataContext } from '../Context/UserContext'
import Unauthorized from '../Pages/UnAuthorized/Unauthorized'
import Student from '../Pages/Lecture/Time Table/Student'
import Admin from '../Pages/Lecture/Time Table/Admin'

const Router = () => {

  const { role } = useContext(userDataContext);

  return (
    <Routes>
        {/* Accessed by anyone */}
        <Route path='*' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        <Route path='/lecture' element={
          <ProtectRoute 
            allowedRoles={['student', 'admin']} 
            role={role} 
            student={<Student />}
            admin={<Admin />}
          >
            <Lecture />
          </ProtectRoute>
        } />

        {/* admin routes */}

        <Route path='/master-data' element={
          <ProtectRoute allowedRoles={['admin']} role={role}>
            <MasterData />
          </ProtectRoute>
        } />
        
        <Route path='/mapping' element={
          <ProtectRoute allowedRoles={['admin']} role={role}>
            <Mapping />
          </ProtectRoute>
        } />
        
        <Route path='/signup' element={
          <ProtectRoute allowedRoles={['admin']} role={role}>
            <SignUp />
          </ProtectRoute>
        } />

        <Route path='/CommitteeMembers' element={
          <ProtectRoute>
            <CommitteeMembers />
          </ProtectRoute>
        } />

        
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default Router
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Lecture from '../Pages/Lecture/Lecture'
import MasterData from '../Pages/Admin/MasterData'
import Login from '../Pages/Auth/Login'
import SignUp from '../Pages/Admin/SignUp'
import ProtectRoute from '../Components/ProtectRoute'
import Mapping from '../Pages/Admin/Mapping/Mapping'
import Unauthorized from '../Components/UnAuthorized/Unauthorized'
import CommitteeMembers from '../Pages/Management/CommitteeMembers'
import Users from '../Pages/Admin/Users/Users'

const Router = () => {

  return (
    <Routes>
        {/* Accessed by anyone */}
        <Route path='*' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        <Route path='/lecture' element={
          <ProtectRoute 
            allowedRoles={['student', 'admin', 'staff']} 
          >
            <Lecture />
          </ProtectRoute>
        } />

        {/* admin routes */}

        <Route path='/master-data' element={
          <ProtectRoute allowedRoles={['admin']}>
            <MasterData />
          </ProtectRoute>
        } />
        
        <Route path='/mapping' element={
          <ProtectRoute allowedRoles={['admin']}>
            <Mapping />
          </ProtectRoute>
        } />

        <Route path='/users' element={
          <ProtectRoute allowedRoles={['admin']}>
            <Users />
          </ProtectRoute>
        } />
        
        <Route path='/signup' element={
          <ProtectRoute allowedRoles={['admin']}>
            <SignUp />
          </ProtectRoute>
        } />

        <Route path='/CommitteeMembers' element={
          <ProtectRoute allowedRoles={['management']}>
            <CommitteeMembers />
          </ProtectRoute>
        } />

        
        <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Router
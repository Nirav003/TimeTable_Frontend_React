import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Lecture from '../Pages/Lecture/Lecture'
import MasterData from '../Pages/MasterData'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import ProtectRoute from '../Components/ProtectRoute'
import Mapping from '../Pages/Mapping/Mapping'
import Unauthorized from '../Components/UnAuthorized/Unauthorized'
import CommitteeMembers from '../Pages/CommitteeMembers'

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
            allowedRoles={['student', 'admin']} 
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
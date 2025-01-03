import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Lecture from '../Pages/Lecture/Lecture'
import MasterData from '../Pages/MasterData'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import ProtectRoute from '../Components/ProtectRoute'
import Mapping from '../Pages/Mapping/Mapping'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/lecture' element={
          <ProtectRoute>
            <Lecture />
          </ProtectRoute>
        } />
        <Route path='/master-data' element={
          <ProtectRoute>
            <MasterData />
          </ProtectRoute>
        } />
        <Route path='/mapping' element={
          <ProtectRoute>
            <Mapping />
          </ProtectRoute>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default Router
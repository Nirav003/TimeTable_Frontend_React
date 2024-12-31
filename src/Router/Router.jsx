import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Lecture from '../Pages/Lecture/Lecture'
import MasterData from '../Pages/MasterData'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import ProtectRoute from '../Components/ProtectRoute'
import Room from '../Components/MasterData/Room'
import Stream from '../Components/MasterData/Stream'
import Subject from '../Components/MasterData/Subject'
import Professor from '../Components/MasterData/Professor'
import Shift from '../Components/MasterData/Shift'
import TimeSlot from '../Components/MasterData/TimeSlot'
import Division from '../Components/MasterData/Division'
import StreamSubjectMapping from '../Pages/Mapping/StreamSubjectMapping'

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
            <StreamSubjectMapping />
          </ProtectRoute>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default Router
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
        <Route path='/master-data/room' element={
          <ProtectRoute>
            <Room />
          </ProtectRoute>
        } />
        <Route path='/master-data/stream' element={
          <ProtectRoute>
            <Stream />
          </ProtectRoute>
        } />
        <Route path='/master-data/subject' element={
          <ProtectRoute>
            <Subject />
          </ProtectRoute>
        } />
        <Route path='/master-data/professor' element={
          <ProtectRoute>
            <Professor />
          </ProtectRoute>
        } />
        <Route path='/master-data/shift' element={
          <ProtectRoute>
            <Shift />
          </ProtectRoute>
        } />
        <Route path='/master-data/timeslot' element={
          <ProtectRoute>
            <TimeSlot />
          </ProtectRoute>
        } />
        <Route path='/master-data/division' element={
          <ProtectRoute>
            <Division />
          </ProtectRoute>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default Router
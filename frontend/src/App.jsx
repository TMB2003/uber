import React from 'react'
import { Route, Routes } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import userLogout from './pages/userLogout'
import captainLogout from './pages/captainLogout'
import userProtectWrapper from './pages/userProtectWrapper'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home' element={
          <userProtectWrapper>
            <Home />
          </userProtectWrapper>
        } />
        <Route path='/user/logout' element = {
          <userProtectWrapper>
            <userLogout />
          </userProtectWrapper>
        } />
        <Route path='/captain-home' element = {
          <CaptainProtectWrapper>
            <CaptainHome  />
          </CaptainProtectWrapper>
        } />
        <Route path='/captain/logout' element = {
          <CaptainProtectWrapper>
            <captainLogout  />
          </CaptainProtectWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App
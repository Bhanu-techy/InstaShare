
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
//import UserProfile from './components/Userprofile'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedLogin from './components/ProtectedLogin'


import './App.css'

const App = () => {

  return(
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path="/my-profile" element={<MyProfile/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        </BrowserRouter>
    )
  }


export default App


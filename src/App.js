
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import SearchPage from './components/SearchPage'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedLogin from './components/ProtectedLogin'


import './App.css'

const App = () => {

  return(
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<ProtectedLogin><Login/></ProtectedLogin>}/>
          <Route exact path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route exact path="/my-profile" element={<ProtectedRoute><MyProfile/></ProtectedRoute>}/>
          <Route extact path="/profile/:id" element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
          <Route extact path='/search' element={<ProtectedRoute><SearchPage/></ProtectedRoute>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        </BrowserRouter>
    )
  }


export default App


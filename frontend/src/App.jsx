import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import CourseDetails from './pages/CourseDetails'
import MyCourses from './pages/MyCourses'
import { Routes,Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/course/:id" element={<CourseDetails/>}/>
      <Route path="/my-courses" element={<MyCourses/>}/>
    </Routes>
  )
}

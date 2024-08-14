import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom"

import Header from './components/Header.jsx'
import Dashboard from './components/Dashboar.jsx'
import EmployeeList from './components/EmployeeList'
import Login from './components/Login'
import Signup from './components/Signup'
import Error from './components/Error.jsx'

const route = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Header/>} errorElement={<Error/>}>
    <Route index element={<Dashboard/>} />
    <Route path="employeelist" element={<EmployeeList/>} />
    <Route path="login" element={<Login/>} />
    <Route path="signup" element={<Signup/>} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route}/>
  </React.StrictMode>,
)
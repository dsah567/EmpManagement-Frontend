import React, { useState, useEffect } from 'react'
import { Link, Outlet,NavLink } from 'react-router-dom'


export default function Header() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
}, []);

const handleLogout = () => {
  localStorage.removeItem('username');
  setUsername(null);
  window.location.href = '/login'
};

  return (
  <>
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex-grow lg:flex lg:justify-center space-x-4 lg:space-x-8">
        <nav className="space-x-4">
            {username ? (
              <>
                <NavLink 
                    to="/" 
                    className={({ isActive }) =>`${ isActive ?  "text-blue-400" : "text-white"}  hover:font-bold `}
                  >
                    Dashboard
                </NavLink>
                <NavLink 
                to="employeelist"
                className={({ isActive }) =>`${ isActive ?  "text-blue-400" : "text-white"}  hover:font-bold `}
                >
                  EmployeeList
                </NavLink>  
                <NavLink 
                to="addemp"
                className={({ isActive }) =>`${ isActive ?  "text-blue-400" : "text-white"}  hover:font-bold `}
                >
                  Add Employee
                </NavLink> 
                <button onClick={handleLogout} className="hover:underline">Logout</button>
              </>
            ) : (
            <>
              <NavLink 
                to="login"
                className={({ isActive }) =>`${ isActive ?  "text-blue-400" : "text-white"}  hover:font-bold `}
                >
                  Login
                </NavLink>  
                <NavLink 
                to="signup"
                className={({ isActive }) =>`${ isActive ?  "text-blue-400" : "text-white"}  hover:font-bold `}
                >
                  Sign Up
                </NavLink>  
            </>
            )}
        </nav>
      </div>
      </nav>
    </header>

    <Outlet/>
  </>
  )
}
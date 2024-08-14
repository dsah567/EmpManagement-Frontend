import React, { useState, useEffect } from 'react'


export default function Dashboar() {
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedName = localStorage.getItem('name');
    setUsername(storedUsername);
    setName(storedName)
  }, []);
  return (
  <>

<div className={`flex justify-center items-center min-h-screen `}>
    <div className="w-full max-w-md p-8 space-y-4 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-900">
    <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Welcome to dashboard/ Admin Pannel</h1>
    <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Username is : {username}</h1>
    <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white" >name is : {name}</h1>
    </div>
    </div>
  </>
  )
}

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Error() {
  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div>
      <h3 className="text-6xl font-medium text-center">404 Not Found</h3>
      <p className='mt-6 mb-6 font-bold tracking-wide'>Your visited page not found. You may go home page try again</p>
      <Link to="/login" className='btn mx-auto w-full bg-red-500 hover:bg-red-400 text-white'>Try Again After Login</Link>
      </div>
    </div>
  )
}

export default Error
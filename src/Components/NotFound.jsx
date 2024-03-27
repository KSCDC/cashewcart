import React from 'react'

function NotFound() {
  return (
    <main>
      <img src='/404.svg' alt='Not Found' className='h-52 object-contain'/>
      <h1 className='text-center text-2xl font-serif mt-4 text-red-500'>No Products Found</h1>
    </main>
  )
}

export default NotFound
import React from 'react'

function Banner({image}) {
  return (
    <div className="p-3">
        <img src={image} alt={image} className='w-full h-auto object-cover' />
    </div>
  )
}

export default Banner
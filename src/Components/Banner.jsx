import React from 'react'

function Banner({image}) {
  return (
    <div className="p-3">
        <img src={image} alt={image} className='w-full h-96 object-cover' />
    </div>
  )
}

export default Banner
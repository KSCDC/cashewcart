import React from 'react'

function HomeBanner({imageNumber}) {
  return (
    <main>
        <img src={`/banner/hero-${imageNumber}.png`} className='h-56 lg:h-80 w-full object-cover' alt="" />
    </main>
  )
}

export default HomeBanner
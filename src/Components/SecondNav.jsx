import React from 'react'

function SecondNav() {
  return (
       <nav className="h border lg:rounded-[12px] bg-white text-black uppercase w-full flex items-end lg:items-center justify-between z-50">
   
                <div className='lg:flex grid'>
                    <img src="/logo/CDC.png" className="h-24 mt-2" alt="Logo" />

                    <div className="logo flex items-center">

                        <div className="p-2">
                            <h3 className="font-bold max-w-2xl lg:text-xl">
                                THE KERALA STATE CASHEW DEVELOPEMENT CORPORATION LTD
                            </h3>
                            <p className="text-[11px] text-gray-800 font-semibold">
                                A Government of Kerala Undertaking  (AN ISO 22000-2005 CERTIFIED COMPANY)
                            </p>
                        </div>

                    </div>
                </div>
          
                <div className="ml-5 flex flex-col items-center p-3">
                    <img src="/logo/logo.png" className="h-12" alt="Logo" />
                    <a href="https://cashewcorporation.com" className='ml-5' target='_blank'>
                        <button className="btn bg-red-500 text-white text-sm capitalize hover:bg-red-600">
                            visit website
                        </button>
                    </a>
                </div>
            </nav> 
  )
}

export default SecondNav
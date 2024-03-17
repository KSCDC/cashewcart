import React, { useEffect, useState } from 'react'

function Footer() {
  const [year, setYear] = useState(null)
  useEffect(() => {
    const date = new Date()
    setYear(date.getFullYear())
  }, [])
  return (
    <div className='bg-gray-100'>
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
          <img src="/logo/kscdc.png" className='h-32 w-28 object-cover' alt="" />
          <p>The Kerala State Cashew Development Corp Ltd.<br />A GOVERNMENT OF KERALA UNDERTAKING (AN ISO 22000-2005 CERTIFIED COMPANY)</p>
        </aside>
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Contact us</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Information</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Terms & Condition</a>
          <a className="link link-hover">Cancellation Policy</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Shipping Policy</a>
        </nav>

      </footer>
      {/* copy right */}
      <div className="flex items-center text-center mx-auto">
        <h2 className='p-2'>@{year} powered by <a href="https://www.cashewcorporation.com" className='font-bold'>Cashew Corporation</a></h2>
      </div>
      {/* company name */}
      <div className="text-center mx-auto mt-2">
        <hr className='border border-b-gray-600' />
        <a className='text-sm' href="">Designed And Developer By <span className='font-bold'>IGORAZA</span></a>
      </div>
    </div>
  )
}

export default Footer
import { Link } from "react-router-dom"

function Login() {
  return (
    <div className='min-h-screen'>
        <h3 className="text-3xl font-semibold text-center">
        Login
        </h3>
        <div className="w-96 flex items-center justify-center">
          <div className=" rounded-lg flex flex-col items-center justify-center p-2 gap-y-7">
            <input type="email" className='input w-full' placeholder='Enter Your Email...' />
            <input type="password" className='input w-full' name="password" placeholder='Enter Your Password...' id="" />
            <div className="flex justify-between items-center">
              <button className='btn bg-red-500 hover:bg-red-400 text-white'>Submit</button>
              <Link className="underline text-red-500">Create a new account ?</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login
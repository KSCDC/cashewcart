import { FaSpinner } from "react-icons/fa";

function Loading() {
  return (
    <div className='min-h-96 flex items-center justify-center'>
        <div className="flex items-center gap-x-4">Loading
        <FaSpinner className="animate-spin"/>
        </div>
    </div>
  )
}

export default Loading
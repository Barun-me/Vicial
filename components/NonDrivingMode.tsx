import React, { useState } from 'react'
import Middlebar from './NonDrivingMode/Middlebar'
import Rightbar from './NonDrivingMode/Rightbar'
import LeftBar from './NonDrivingMode/LeftBar'
import { PanelRightClose, PanelRightOpen } from 'lucide-react'

function NonDrivingMode() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 
    xxl:max-w-screen-xxl flex justify-between bg-gray-200">
      {/* Sidebar container */}
      <div
        className={`px-2 xsm:px-4 xxl:px-8 bg-gray-200
          transition-all duration-300
          ${sidebarOpen ? 'w-64' : 'w-16'}`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="group mb-4 p-1 rounded-full"
        >
          <span className='group-hover:text-sky-800'>{sidebarOpen ? <PanelRightClose /> : <PanelRightOpen />}</span>
        </button>
        {/* Pass sidebarOpen as a prop so LeftBar can adjust its content if needed */}
        <LeftBar sidebarOpen={sidebarOpen} />
      </div>

      <div className="!bg-white rounded-xl flex-1 lg:min-w-[600px] mt-1">
        <Middlebar />
      </div>

      <div className="!bg-white hidden rounded-xl mt-1 lg:flex md:ml-8 flex-1 shadow-md">
        <Rightbar />
      </div>
    </div>
  )
}

export default NonDrivingMode

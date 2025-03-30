import React from 'react'
import { Search } from 'lucide-react';

const Explore = () => {
  return (
    <div className='bg-gray-300 py-2 px-4 flex 
    items-center gap-4 rounded-full ml-3'>
      <Search />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none placeholder:text-textGray" />
    </div>
  )
}

export default Explore
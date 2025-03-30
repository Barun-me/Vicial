//Middlebar.tsx
import React from 'react'
import Feed from './Feed'
import Share from './Share'
import Link from 'next/link'

function Middlebar() {
  return (
    <div className=''>
      <div className='px-10 pt-4 flex justify-between 
    font-bold border-b-[1px]'>
        <Link className='pb-3 flex items-center 
      border-b-4 border-x-cyan-600' href={'/'}>For You</Link>
        <Link className='pb-3 flex items-center' href={'/'}>Following</Link>
      </div>
      <div className='mb-2'><Share /></div>
      <Feed />
    </div>

  )
}

export default Middlebar
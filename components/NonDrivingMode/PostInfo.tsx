import React from 'react'
import Image from './Image'

function PostInfo() {
  return (
    <div className='cursor-pointer w-4 h-4 relative'>
        <Image
            path='icons/nextjs.webp'
            alt=''
            w={20}
            h={20}
        />

    </div>
  )
}

export default PostInfo
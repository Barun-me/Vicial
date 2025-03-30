import React from 'react'
import Image from './Image'
import PostInfo from './PostInfo'
import PostInteraction from './PostInteraction'

function Post() {
    return (
        <div className='p-4 border-y-[1px] border-gray-700 ml-4'>
            <div className='flex items-center gap-2 text-sm mb-2 font-bold'>
                icon
                <span>Username</span>
            </div>

            {/* POST CONTENT */}
            <div className='flex gap-4'>
                {/* AVATAR */}
                <div className='relative w-10 h-10 rounded-full overflow-hidden'>
                    <Image
                        path='general/male1.jpg'
                        alt=''
                        w={50}
                        h={50}
                        tr={true}
                    />
                </div>
                {/* CONTENT */}
                <div className='flex-1 flex flex-col gap-2'>
                    {/* TOP SECTION */}
                    <div className='flex items-center justify-between gap-2'>
                        <div className='flex items-center gap-2 flex-wrap'>
                            <h1 className='text-md font-bold'>Barun-me</h1>
                            <span className='text-gray-800'>@BarunangshuBhowmik</span>
                            <span className='text-gray-800'>1 day ago</span>
                        </div>
                        <PostInfo />
                    </div>
                    {/* MIDDLE SECTION */}
                    <p className=''>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Maxime veritatis nulla earum excepturi ut, distinctio minus 
                        architecto dolore praesentium eaque voluptates. 
                        Enim quasi vel harum, deleniti blanditiis a error explicabo.
                    </p>
                    <Image
                        path='general/OIP.jpg'
                        alt=''
                        w={500}
                        h={500}
                    />
                    <PostInteraction />
                </div>
            </div>
        </div>
    )
}

export default Post
import { Forward, MessageCircle, ThumbsUp } from 'lucide-react'
import React from 'react'

function PostInteraction() {
  return (
    <div className='flex items-center gap-7 cursor-pointer group'>
        <ThumbsUp />
        <MessageCircle />
        <Forward />
    </div>
  )
}

export default PostInteraction
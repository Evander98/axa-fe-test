import Image from 'next/image'
import React from 'react'

const PostCard = ({data}) => {
  return (
    <div className='border-4 rounded-lg p-4'>
      <p className='headline--large mb-2'>{data?.title}</p>
      <p>{data?.body}</p>
      {
        data?.url && <img src={data.url} alt={data.url} className="m-auto mt-8"/>
      }
    </div>
  )
}

export default PostCard
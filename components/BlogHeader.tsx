/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { BlogPost } from '../types/blog'

interface IHeaderProps {
  createdAt: string
  author: {
    name: string
    avatar: string
    url: string
  }
}

const BlogHeader: React.FC<IHeaderProps> = (props) => {
  const { createdAt, author } = props
  const createdDate: Date = new Date(createdAt)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return (
    <div className='flex'>
      <img src={author.avatar} className='mb-4 mr-4 rounded-[50%]' width={50} height={50} alt='author pfp' />
      {/* tên  */}
      <div className='flex flex-col'>
        <p className='text-[1rem] font-semibold'>{author.name}</p>
        <div className='flex gap-4'>
          <li className='list-none text-[0.75rem] font-normal'>{author.url}</li>
          <li className='list-none text-[0.85rem] font-normal'>{createdDate.toLocaleDateString('en-US', options)}</li>
        </div>
      </div>
    </div>
  )
}

export default BlogHeader

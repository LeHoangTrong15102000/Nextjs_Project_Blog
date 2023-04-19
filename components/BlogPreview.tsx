import React from 'react'
import { BlogPost } from '../types/blog.type'
import BlogHeader from './BlogHeader'

// interface PropsType {
//   title: string
//   bodyText: string
//   createdAt: string
//   author:
// }

// Thằng BlogPreview có type là BlogPost
const BlogPreview: React.FC<BlogPost> = (props) => {
  const { title, bodyText, createdAt, author, tags } = props
  const previewText: string = bodyText.substring(0, 150) + '...' // cắt từ cái bodyText ra
  return (
    <section>
      <BlogHeader createdAt={createdAt} author={author} />
      <h2 className='font-bold'>{title}</h2>
      <span className='mt-2'>{previewText}</span>
      {/* tags */}
      <div className='mt-3 flex gap-3'>
        {tags.map((tag, index) => {
          return (
            <p key={index} className='mt-2 rounded-xl bg-sky-600 px-2 font-semibold text-zinc-800'>
              {tag}
            </p>
          )
        })}
      </div>
    </section>
  )
}

export default BlogPreview

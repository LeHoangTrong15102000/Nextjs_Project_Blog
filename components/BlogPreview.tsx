import React from 'react'
import { BlogPost } from '../types/blog'

// interface PropsType {
//   title: string
//   bodyText: string
//   createdAt: string
//   author:
// }

// Thằng BlogPreview có type là BlogPost
const BlogPreview: React.FC<BlogPost> = (props) => {
  const { title, bodyText, createdAt, author, tags } = props
  return (
    <section>
      <h2 className='font-bold'>{title}</h2>
    </section>
  )
}

export default BlogPreview

import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { getBlogDetail } from '../../server/blogs'

const BlogPost: NextPage = () => {
  return (
    <div>
      <h1>Blog Post</h1>
    </div>
  )
}

export default BlogPost

// làm sao để lấy được id của cái route này, để nó truyền id vào cái function để biết được là đang lấy `id` của blog nào
export const getServerSideProps: GetServerSideProps = async (context) => {
  const route: string[] | string | undefined = context.query.id
  console.log(route)
  await getBlogDetail(1)
  return {
    props: {}
  }
}

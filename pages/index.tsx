import { GetServerSideProps } from 'next'
import { getBlogs } from '../server/blogs'

export default function Home() {
  // Đây là trang index.html trong Reactjs
  return (
    // h-screen và w-screen muốn thằng main bao trùm hết màn hình
    <main className='flex h-screen w-screen flex-col items-center overflow-auto bg-zinc-800 font-poppins text-neutral-300'>
      <title>Home Page</title>
      <section>
        <div className='mt-3 text-center'>
          <h1 className='text-[3rem]'>Welcome to DevBlog</h1>
          <p>A full-stack blog made with Next.js, TailwindCSS, Github GraphQL</p>
        </div>
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs = getBlogs()
  return {
    props: {}
  }
}

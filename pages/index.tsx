import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { getBlogs } from '../server/blogs'
import { BlogPost } from '../types/blog'
import BlogPreview from '../components/BlogPreview'

const Home: NextPage = ({ blogData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
      <section className='mt-12 flex flex-col items-center text-[1.15rem]'>
        {/* Tạo cái postment vào trong đây */}
        <div className='mb-12 flex gap-3'></div>
        {blogData.map((blog: BlogPost) => {
          return (
            <div
              key={blog.id}
              className='mx-6 mb-6 max-h-[20em] max-w-[28em] cursor-pointer overflow-hidden rounded-lg bg-neutral-300 p-4 text-zinc-800 transition-all duration-300 hover:bg-neutral-500 hover:text-neutral-300'
            >
              <BlogPreview
                title={blog.title}
                bodyText={blog.bodyText}
                createdAt={blog.createdAt}
                author={blog.author}
                tags={blog.tags}
              />
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs() // Do giá trị trả về là một promise nên phải await
  console.log(blogs)
  return {
    props: {
      blogData: blogs
    }
  }
}

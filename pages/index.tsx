import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { getBlogs } from '../server/blogs'
import { BlogPost } from '../types/blog'
import BlogPreview from '../components/BlogPreview'

const Home: NextPage = ({ blogData, tags }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        {/* Tags của từng blogPost */}
        <div className='mb-12 flex gap-3'>
          {tags.map((tag: string, index: number) => {
            return (
              <button key={index} className='label transition-all duration-200 hover:bg-sky-400'>
                {tag}
              </button>
            )
          })}
        </div>
        {/* Blog content */}
        {blogData.map((blog: BlogPost) => {
          return (
            <div
              key={blog.id}
              className='mx-6 mb-6 max-h-[20em] max-w-[28em] cursor-pointer overflow-hidden rounded-lg bg-neutral-300 p-4 text-zinc-800 transition-all duration-300 hover:bg-neutral-500 hover:text-neutral-300'
            >
              <a href={blog.url} target='_blank' rel='noreferrer'>
                <BlogPreview
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                />
              </a>
            </div>
          )
        })}
      </section>
    </main>
  )
}

export default Home

// getServerSideProps dùng để gọi Api trong Nextjs
export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs() // Do giá trị trả về là một promise nên phải await
  let tags: string[] = []
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    }
  }
  console.log(tags)
  return {
    props: {
      blogData: blogs,
      tags
    }
  }
}

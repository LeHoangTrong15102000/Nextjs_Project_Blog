import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import BlogHeader from '../../components/BlogHeader'
import parse from 'html-react-parser'
import { getBlogDetail } from '../../server/blogs'
import detail from './id.module.css'

const BlogPost: NextPage = ({ blogData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { author, bodyHTML, createdAt, title } = blogData
  return (
    <section className='layout'>
      <div className='max-w-[50%]'>
        <h1 className='my-10 text-center text-[2rem] font-bold'> {title} </h1>
        <div className='mb-4 flex justify-center'>
          <BlogHeader createdAt={createdAt} author={author} />
        </div>
        <div className={`${detail.html} flex flex-col`}>{parse(bodyHTML)}</div>
      </div>
    </section>
  )
}

export default BlogPost

// làm sao để lấy được id của cái route này, để nó truyền id vào cái function để biết được là đang lấy `id` của blog nào
export const getServerSideProps: GetServerSideProps = async (context) => {
  const route: string[] | string | undefined = context.query.id // lấy ra cái id từ trên thanh URL(có kiểu là string)
  const id = Number(route)
  // console.log(route)
  let blogDetail = await getBlogDetail(id)
  return {
    props: {
      blogData: blogDetail
    }
  }
}

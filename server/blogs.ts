import { BlogDetail, BlogPost } from '../types/blog.type'
import { discussionDetailGql, discussionGql } from './gql'

// Thằng này nó sẽ chịu trách nhiệm gọi cái thằng query gql này và sẽ lấy cái Api cho mình
const API_URL = 'https://api.github.com/graphql'
const GH_ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN
const DISCUSSION_CATEGORY_ID = process.env.DISCUSSION_CATEGORY_ID

// Lấy các bài Blog từ github Api về, cái function này sẽ return về một cái Promise(resolve, reject) và kiểu dữ liệu trả về là một BlogPost[]
export async function getBlogs(): Promise<BlogPost[]> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      // sẽ bao gồm 2 cái
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    // biến kiểu objec thành kiểu JSON
    body: JSON.stringify({ query: discussionGql(DISCUSSION_CATEGORY_ID) }) // gửi lên cái object có key là `query`
  })
  let res = await response.json()
  // Lưu những thứ mà graphQL github trả về lưu vào một biến
  const discussions = res.data.repository.discussions.nodes
  // giá trị trả về là một blogPost
  const posts = discussions.map((discussion: any): BlogPost => {
    // bóc tách phần tử ra
    const {
      title,
      author,
      createdAt,
      lastEditedAt: lastEdited,
      number: id,
      bodyHTML: html,
      bodyText,
      labels,
      url: discussionUrl
    } = discussion
    // custom URL
    const url = `/blog/${id}`
    const authorUrl = author.url
    const authorName = author.login
    const authorAvatar = author.avatarUrl
    // lấy ra các cái labels cho blog, tag truyền vào có dạng là một cái object { name: string}
    const tags: string[] = labels.nodes.map((tag: { name: string }) => {
      return tag.name
    })
    // Sẽ tạo biến mới là post, là post của từng cái postment
    const post = {
      id,
      url,
      discussionUrl,
      title,
      html,
      bodyText,
      tags, // Thay vì là labels thì chúng ta chỉ muốn lấy cái tags của nó
      createdAt,
      lastEdited,
      author: {
        url: authorUrl,
        name: authorName,
        avatar: authorAvatar
      }
    }
    return post
  })
  return posts
}

// Tạo ra cái function mới để gọi getBlogDetail

export async function getBlogDetail(blogId: number): Promise<BlogDetail> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: discussionDetailGql(blogId) })
  })
  let res = await response.json()
  console.log(res)
  let discussion = res.data.repository.discussion
  const {
    author: { url: authorUrl, login: authorName, avatarUrl: authorAvatar },
    createdAt,
    title: title,
    bodyHTML: html
  } = discussion
  const detail = {
    author: { url: authorUrl, name: authorName, avatar: authorAvatar },
    createdAt,
    title,
    bodyHTML: html
  }
  return detail
}

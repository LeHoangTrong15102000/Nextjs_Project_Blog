import { discussionGql } from './gql'

// Thằng này nó sẽ chịu trách nhiệm gọi cái thằng query gql này và sẽ lấy cái Api cho mình
const API_URL = 'https://api.github.com/graphql'
const GH_ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN
const DISCUSSION_CATEGORY_ID = process.env.DISCUSSION_CATEGORY_ID

// Lấy các bài Blog từ github Api về
export async function getBlogs() {
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
  console.log(res.data)
}

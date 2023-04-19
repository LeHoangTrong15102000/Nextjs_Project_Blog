// DIC_kwDOJScU3M4CVjHE cái Id sẽ truyền nó qua một biến

export function discussionGql(ghDiscussionCategoryId: string | undefined) {
  return `{
    repository(owner: "LeHoangTrong15102000", name: "Nextjs_Project_Blog") {
      discussions(first: 100, categoryId: "${ghDiscussionCategoryId}") {
        nodes {
          title
          url
          number
          bodyHTML
          bodyText
          createdAt
          lastEditedAt
          author {
            login
            url
            avatarUrl
          }
           labels(first: 100) {
            nodes {
              name
            }
          }
        }
      }
    }
  }`
}

// Tạo ra cái hàm lấy ra single Post -> Chỉ muốn lấy ra chi tiết 1 bài post
export function discussionDetailGql(postId: number | undefined) {
  return `{
    repository(owner: "LeHoangTrong15102000", name: "Nextjs_Project_Blog") {
      discussion(number: ${postId}) {
        title
        bodyHTML
        createdAt
        author {
          login
          url
          avatarUrl
        }
      }
    }
  }`
}

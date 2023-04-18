export interface BlogPost {
  id?: number
  url?: string
  discussionUrl?: string
  title: string // tất nhiên bài post nào cũng có title nên là bất buộc
  html?: string
  bodyText: string // bắt buộc phải có
  tags: string[]
  createdAt: string
  lastEdited?: string | null
  author: {
    name: string
    url: string
    avatar: string
  }
}

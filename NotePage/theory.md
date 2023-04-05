// **\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***
-> Giới thiệu Nextjs

- Trong Nextjs phần `pages` thì mỗi file sẽ là một traeng khác nhau
- GraphQL thì nó giúp mình lấy những thông tin mà chúng ta muốn thôi không cần dùng những thông tin dư thừa -> Chúng ta cần cái ID của cái Blog - DIC_kwDOJScU3M4CVjHE - id của Blog - github
- Lấy cái `query` nảy để lấy từng bài post trong Discussions của chúng ta
  repository(owner: "LeHoangTrong15102000", name: "Nextjs_Project_Blog") {
  discussions(first: 100, categoryId: "DIC_kwDOJScU3M4CVjHE") {
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

- bodyHTML: giúp chúng ta style cái blog của chúng ta
- html-react-parser -> covert HTML sang React
- Author: Login, URL, AvatarURL
- -> Đây là những cái Rules mà chúng ta cần để xây dựng lên DevBlog của chúng ta

-> Thì sẽ sau khi đã khai báo gql.ts thì chúng ta sẽ query cái file đó bằng cách tạo 1 cái sv mới

- Gọi Api từ Blogs.ts

  - Trước hết sẽ cần cái cái đường link APi URl của github -> 'https://api.github.com/graphql'
  - Tiếp theo chúng ta sẽ cần Github access_token và discusstionGqlID
  - Sẽ sử dụng fetch() để lấy data về
  - Trên headers sẽ khai báo bao gồm Authorization: `token` sẽ cần cái github token của chúng ta để biết mình là người đăng nhập vào cái github này

  - access_token trên github `ACCESS_TOKEN` -> Nếu chúng ta để hẳn vào cái biến khi mà chúng ta đưa lên github thì người khác sẽ thấy cái access_token này của chúng ta điều này rất là nguy hiểm -> Nên là cần 1 biến môi trường để lưu cái giá trị này
  - Trong cái file .env có thể bỏ những thông tin báo mật mà không muốn người ta thấy
  - Tại vì chúng ta muốn code nó dưới dạng JSON
  - Bây giờ sẽ là phần quan trọng là phần chúng ta sẽ thêm cái query vào - Thì method POST: nó sẽ có phần body để gửi data lên json
  - `hi e, a dùng POST tại vì mình phải truyền cái query của GraphQL lên ấy chứ kh đơn thuần là lấy data từ API về, mình phải POST cái GraphQL query lên thì nó mới trả về cho mình cái discussion của bài blog đó, cụ thể là dòng body: JSON.stringify() ấy`
  - Cái body là phải gửi Graphql query mà chúng ta đã lấy về từ github Api của chúng ta -> Sẽ gửi lên cái object có key là query -> body: JSON.stringify({ query: discussionGql(DISCUSSION_CATEGORY_ID) }) // gửi lên cái object có key là `query`
    -> Được biết là khi mà sử dụng fetch() nó sẽ tốn 1 thời gian nhất định nên cần phải cho app chúng ta thời gian chờ nhất định để có thể lấy data về
    ->
    -> Thì bây giờ điều quan trọng của mình là mình phải tìm cách gọi cái thằng function getBlogs này ở đâu để nó có thể gọi ra để test cho chúng ta xem

    -> Chúng ta sẽ gọi nó trong file là index.tsx trang `Home` của chúng ta
    -> Nhưng mà trong Nextjs chúng ta sẽ không dùng useEffect() để gọi Api, chúng ta sẽ dùng 1 trong 2 cách là `getServerSideProps` hoặc là `getStaticProps`

    -> Sẽ hướng dẫn lấy nó cũng như điều khác biệt của nó là gì
    -> `getStaticProps` dùng đẻ render ra các trang HTML tính trong lúc build -> hiểu nôm na là sau khi build nó không có thay đổi theo thời gian
    -> `getServerSideProps` Tạo ra cái props và render ra các trang HTML tĩnh trong thời gian chạy cái website (run-time) -> hiểu nôm na là nó sẽ có thay đổi theo các thao tác của người dùng

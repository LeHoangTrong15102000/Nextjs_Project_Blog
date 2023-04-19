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

- -> Thằng `getServerSideProp` là một function có sẵn trong Nextjs rồi -> Và thằng này là một async function -> Nếu nó lỗi là tại vì nó chưa return về một cái function gì trong đó hết -> Phải return về một cái propments
- -> Thì cái function này nó trả về cho mình thì mình muốn những cái như là `title`, `command`
- -> Trong cái dự liệu trả về tì chúng ta cần cái labels in ra những cái nhãn `labels` chúng ta cần để in ra -> Do sử dụng typescript nên cần tạo một cái `type` để có thể handle được dễ hơn
- -> `author` là một cái object trong đó có chứa {url , login, avatarUrl}
- -> Bây giờ chúng ta đã có thằng `posts` này rồi và có những thứ mà chúng ta cần rồi, thì bây giờ chúng ta sẽ tạo 1 cái type riêng cho nó
- -> Chúng ta thắc mắc là bây giờ chúng ta sẽ lấy nó ra như thế nào -> thì chúng ta sẽ lấy nó ra như sau
- -> Home: NextPage = ({blogData}) -> Nó báo lỗi nên phải dùng `type` của GetServerSideProps
- -> Tạo 1 cái type cho cái blogPreview của chúng ta
- -> Bọc cái thẻ đó xung quanh để khi mà chúng ta nhấn vào thì nó sẽ redirect chúng ta đi đâu đó -> Sử dụng thẻ `a` -> thêm `noreferrer` để dùng cho vấn đề bảo mật
- -> một hồi chúng ta sẽ tìm hiểu cái thằng `id` trong `nextjs` nó sẽ handle việc này như thế nào để nó có thể render được từng `blogpost` luôn -> Trước hết khi mà nhấn vào thì ta sẽ cho nó hiện cái URl riêng biệt với cái `id` của từng `blogPost`
- -> Quay trở lại với blogPreview bây giờ chúng ta muốn `render` cái tags ra bên ngoài -> khi mà sử dụng thẻ /img thì nó sẽ cảnh báo chúng ta và khuyên chúng ta nên dùng thẻ <Image /> được import từ 'next/image'
- -> để ngày tháng nó hiện rõ thì trong cái phương thức `toLocaleDateString()` nhận vào một cái object -> // Để biết type của thằng options trong toLocaleDateString() thì chỉ cần search gg là sẽ có người chỉ: options: Intl.DateTimeFormatOptions
- -> Mình không muốn lấy một cái tags mà mình muốn lấy tất cả các cái `tags` của các blogPost -> Cái phần tags trên trang web là tập hợp tất cả các cái tags của -> Để làm được việc như vậy thì chúng ta cần lập qua từng `tags` của từng bài `blogPost` -> Array dùng phương thức include sẽ trả về một giá trị boolean là true hoặc là false
- -> Sau khi lấy được array tags bây giờ chúng ta có thể render đóng tags này ra
- -> Cái quan trọng là logic của thằng `filter` -> không chỉ là filter một cái thì thằng thăng filter ở đây nó sẽ `filter` một lúc nhiều cái -> Nếu có thằng blogPost nào đó thỏa mãn thì nó sẽ được hiện ra -> Và nếu mình không nhấn vào cái `filterWord` thì nó sẽ được loại bỏ khỏi array -> Đó là logic mà chúng ta phải dùng để xử lý trong phần `filter` này -> Và khi nhấn vào cái tags nào thì nó đổi màu cái tags đang được nhấn vào - -> để làm được như vậy thì cần phải có thêm 1 cái `state` để lưu trữ việc đổi màu đó -> sẽ lưu trữ và thay đổi màu dựa trên cái `index` của `tags`
- -> Mình muốn thay đổi màu mỗi khi mình nhấn vào từng cái tags trên `tagBlog` -> Mỗi khi nhấn vào thì thực hiện handleSelected -> Khai báo một hàm để xử lý việc này -> Lấy ra `event.target` trong hàm `filterLabel` để có thể trỏ tới từng `index` của từng cái `tags` -> mỗi `button` sẽ có `event.target` khác -> Nếu mà cái tag chưa được chọn thì nó sẽ set cái number đó vào `selectedIndex` còn khi nó đã được chọn rồi thì khi nhấn vào thì nó sẽ đẩy cái `index` đó ra khỏi cái mảng `selectedIndex`
- -> Đã có selectedIndex rồi vậy làm sao thay đổi cái `style` của nó dựa trên `selectedIndex` đây
- -> Sau khi đã có được logic `filterLabel` -> Thì chúng ta cũng sẽ thực hiện việc lọc `blogPost` theo `filterLabel[]` luôn -> Thì cái logic của nó cũng tương tự logic của thằng `filterLabel`
- -> Sau khi đã `filter` được các giá trị array rồi thì tiếp mình phải làm sao để thực sự `filter` các bài `blogPost` -> sẽ tạo một cái biến là `filteredBlog` thì cái biến này sẽ chứa toàn bộ` blogPost` của mình và cả `blogPost` được lọc luôn -> Và chúng ta sẽ return về mộ cái `filterBlog` và render ra lai giao diện bằng cái biến `filterBlog`

> Nhấn vào một bài blog và cách render ra bài blog đó bằng `id`

- -> Phần cuối cùng sẽ tìm hiểu về cách render ra bài blog bằng cách sử dụng thư viện bên ngoài -> Và cách sử dụng `id` trong Nextjs và cách hoạt động `id` trong Nextjs
- -> Thì ở trong Nextjs mỗi `file` trong page là một trang khác nhau -> Thì trang chủ chúng ta đặt là `index.tsx` -> Nếu chúng ta muốn tạo một trang sử dụng cho blog thì chúng ta phải tạo trang với folder là `blog` mỗi file trong bài blog đó là từng `blogId` khác nhau
- -> Trong bài `blogDetail` thì chúng ta chỉ cần curry như này:

  - -> repository(owner: "LeHoangTrong15102000", name: "Nextjs_Project_Blog") {
    discussions(number: ${postId}) {  
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

- -> Tương tự trong cái `blogServer` mình sẽ tạo cái function mới để mình có thể gọi api từ cái function đó trong cái file `id` của chúng ta -> Và chúng ta cũng sẽ tạo cái type riêng cho nó -> Tương tự như thằng `index.tsx` để mà gọi nó chúng ta sẽ sử dụng `getServerSideProps`

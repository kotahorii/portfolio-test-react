import { memo, VFC } from 'react'
import { Post } from 'types/postType'

type Props = {
  post: Post
}

export const PostCard: VFC<Props> = memo(({ post }) => {
  return (
    <div className="flex md:flex-row flex-col m-2 items-center md:space-x-5 cursor-pointer md:w-3/5 max-w-2xl w-80 px-5 py-4 shadow-md hover:shadow-lg rounded-lg space-y-3">
      {post.image.url !== null || '' ? (
        <div className=" w-72 h-52 rounded-lg">
          <img
            className="w-full h-full rounded-lg"
            src={post.image.url}
            alt="post"
          />
        </div>
      ) : (
        <div className=" w-72 h-52 bg-green-200 rounded-lg"></div>
      )}
      <div className="flex flex-col md:h-52 md:w-2/3 w-full py-2 space-y-2">
        <div className="h-10 rounded-lg">
          <p className="text-xl">{post.title}</p>
        </div>
        <div className="h-16 md:block hidden rounded-lg">
          <p className="text-lg">{post.body}</p>
        </div>
        <div className="h-6 rounded-lg">
          <p>
            {post.prefecture}
            <span className="mx-2">{post.city}</span>
            {post.town}
          </p>
        </div>
        <div className="flex flex-row mt-5 justify-between items-center px-2">
          <div className="w-10 h-8 mt-2 mr-2 bg-green-200 rounded-full"></div>
          <div className="h-8 w-28 mt-2 bg-green-200 rounded-full"></div>
          <div className="w-8"></div>
          <div className="h-8 w-28 mt-2 bg-green-200 rounded-full"></div>
        </div>
      </div>
    </div>
  )
})

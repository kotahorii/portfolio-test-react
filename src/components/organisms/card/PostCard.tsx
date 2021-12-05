import { memo, VFC } from 'react'
import { Post } from 'types/postType'
import { StarIcon } from '@heroicons/react/solid'
import { useLikes } from 'hooks/useLikes'
import { LikeButton } from 'components/atoms/button/LikeButton'
import { Link } from 'react-router-dom'
import { useRates } from 'hooks/useRate'
import { useMain } from 'hooks/useMain'
import { XIcon } from '@heroicons/react/outline'

type Props = {
  post: Post
}

export const PostCard: VFC<Props> = memo(({ post }) => {
  const { postsFavorites } = useLikes()
  const { averageRate, postsRates } = useRates()
  const { formatDate } = useMain()
  const { openDeletePostModal, currentUser } = useMain()
  return (
    <div className="flex md:flex-row relative flex-col m-2 items-center md:space-x-5 cursor-pointer md:w-3/5 max-w-2xl w-80 px-5 py-4 shadow-md hover:shadow-lg rounded-lg space-y-3">
      {post.image.url !== null || '' ? (
        <Link to={`/main/${post.id}`} className=" w-72 h-52 rounded-lg">
          <img
            className="w-full h-full rounded-lg"
            src={post.image.url}
            alt="post"
          />
        </Link>
      ) : (
        <Link
          to={`/main/${post.id}`}
          className=" w-72 h-52 bg-gray-200 rounded-lg"
        ></Link>
      )}
      <div className="flex flex-col md:h-52 md:w-2/3 w-full py-2 space-y-2">
        <Link className="flex flex-col space-y-2" to={`/main/${post.id}`}>
          <div className="h-10 rounded-lg max-w-xs">
            <p className="text-xl truncate overflow-ellipsis">{post.title}</p>
          </div>
          <div className="h-16 md:block hidden rounded-lg max-w-xs">
            <p className="text-lg truncate overflow-ellipsis">{post.body}</p>
          </div>
          <div className="h-6 flex flex-col space-y-1 rounded-lg max-w-xs">
            <p>
              {post.prefecture}
              <span className="mx-2">{post.city}</span>
              {post.town}
            </p>
            <p className="text-xs">{formatDate(post.createdAt)}</p>
          </div>
        </Link>
        <div className="flex flex-row relative mt-5 justify-between items-center px-2">
          <div className=" flex flex-row items-center w-10 h-8 mt-2 mr-2 rounded-full">
            <LikeButton post={post} />
            <span>{postsFavorites(post)?.length}</span>
          </div>
          <div className="h-8 w-24 mt-2 flex flex-row justify-between items-center">
            <StarIcon className="w-6 text-yellow-500" />
            <p className="flex flex-row">
              {averageRate(post)?.toString() !== 'NaN'
                ? averageRate(post)?.toString()
                : 0}
              <span className="text-gray-400 ml-0.5">
                ({postsRates(post)?.length}件)
              </span>
            </p>
          </div>
          <div className="w-16"></div>
        </div>
      </div>
      {post.userId === currentUser?.id && (
        <XIcon
          onClick={openDeletePostModal(post)}
          className="absolute right-0 top-0 cursor-pointer w-7 h-7 text-gray-500 hover:text-gray-400"
        />
      )}
    </div>
  )
})

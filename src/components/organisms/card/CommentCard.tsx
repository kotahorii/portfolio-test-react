import { UserCircleIcon } from '@heroicons/react/solid'
import { useDetailPost } from 'hooks/useDetailPost'
import { useMain } from 'hooks/useMain'
import { memo, VFC } from 'react'
import { Comment } from 'types/postType'

type Props = {
  comment: Comment
}

export const CommentCard: VFC<Props> = memo(({ comment }) => {
  const { commentsUser, isLoadingComment } = useDetailPost()
  const { formatDate } = useMain()
  if (isLoadingComment) return null
  return (
    <div className="w-full p-2 flex flex-col space-y-2 shadow-sm rounded-lg bg-gray-50">
      <div className="flex flex-row items-center space-x-3">
        {commentsUser(comment)?.image.url !== null ? (
          <img
            className="rounded-full object-cover w-14 h-14"
            src={commentsUser(comment)?.image.url}
            alt="user icon"
          />
        ) : (
          <UserCircleIcon className=" rounded-full text-gray-200 w-16 h-16" />
        )}
        <div className="flex flex-col space-y-1">
          <p className="font-semibold">{commentsUser(comment)?.name}</p>
          <p className="text-xs">{formatDate(comment.createdAt)}</p>
        </div>
      </div>
      <p className="break-words">{comment.comment}</p>
    </div>
  )
})

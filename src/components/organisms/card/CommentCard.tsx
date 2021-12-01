import { useDetailPost } from 'hooks/useDetailPost'
import { VFC } from 'react'
import { Comment } from 'types/postType'

type Props = {
  comment: Comment
}

export const CommentCard: VFC<Props> = ({ comment }) => {
  const { commentsUser, isLoadingComment } = useDetailPost()
  if (isLoadingComment) return null
  return (
    <div className="w-full p-2 flex flex-col space-y-2 rounded-lg bg-gray-50">
      <div className="flex flex-row items-center space-x-3">
        <div className="rounded-full w-16 h-16 bg-green-200">
          <img
            className="rounded-full"
            src={commentsUser(comment)?.image.url}
            alt="user icon"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <p className="font-semibold">{commentsUser(comment)?.name}</p>
          <p className="text-xs">{comment.createdAt}</p>
        </div>
      </div>
      <p className="break-words">{comment.comment}</p>
    </div>
  )
}

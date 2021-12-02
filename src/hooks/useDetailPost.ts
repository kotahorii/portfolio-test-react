import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { useQueryComments } from './queries/useQueryComments'
import { toast } from 'react-toastify'
import { useCommentMutation } from './queries/useMutationComment'
import { useParams } from 'react-router'
import { useUsers } from './useUsers'
import { Comment } from 'types/postType'
import { useQueryDetailPost } from './queries/useQueryDetailPost'

export const useDetailPost = () => {
  const { data: comments, isLoading: isLoadingComment } = useQueryComments()
  const { users } = useUsers()
  const { createCommentMutation } = useCommentMutation()
  const [comment, setComment] = useState('')
  const { id } = useParams()

  const commentChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value),
    []
  )

  const submitComment = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createCommentMutation.mutate({ postId: Number(id), comment: comment })
      toast.success('Success to create comments!')
      setComment('')
    },
    [comment, createCommentMutation, id]
  )

  const postsComments = useCallback(
    (id: number | undefined) =>
      comments?.filter((comment) => comment.postId === Number(id)),
    [comments]
  )

  const commentsUser = useCallback(
    (comment: Comment) =>
      users?.filter((user) => user.id === comment.userId)[0],
    [users]
  )

  const { data: detailPost, isLoading: isLoadingDetailPost } =
    useQueryDetailPost(Number(id))
  return {
    comment,
    commentChange,
    detailPost,
    isLoadingDetailPost,
    isLoadingComment,
    commentsUser,
    submitComment,
    postsComments,
    createCommentMutation,
    id,
  }
}

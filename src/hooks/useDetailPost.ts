import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { useQueryComments } from './queries/useQueryComments'
import { toast } from 'react-toastify'
import { useCommentMutation } from './queries/useMutationComment'
import { useParams } from 'react-router'

export const useDetailPost = () => {
  const { data: comments } = useQueryComments()
  const { createCommentMutation } = useCommentMutation()
  const [comment, setComment] = useState('')
  const { id } = useParams()

  const commentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value),
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

  const booksComments = useCallback(
    () => comments?.filter((comment) => comment.postId === Number(id)),
    [comments, id]
  )
  return {
    comment,
    commentChange,
    submitComment,
    booksComments,
    createCommentMutation,
    id,
  }
}

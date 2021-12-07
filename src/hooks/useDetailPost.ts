import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { useQueryComments } from './queries/useQueryComments'
import { toast } from 'react-toastify'
import { useCommentMutation } from './queries/useMutationComment'
import { useParams } from 'react-router'
import { useUsers } from './useUsers'
import { Comment } from 'types/postType'
import { useQueryDetailPost } from './queries/useQueryDetailPost'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectIsOpenImageModal, setIsOpenImageModal } from 'slices/postSlice'
import { User } from 'types/userType'

export const useDetailPost = () => {
  const dispatch = useAppDispatch()
  const isOpenImageModal = useAppSelector(selectIsOpenImageModal)
  const { data: comments, isLoading: isLoadingComment } = useQueryComments()
  const { users } = useUsers()
  const { createCommentMutation } = useCommentMutation()
  const { id } = useParams()
  const {
    data: detailPost,
    isLoading: isLoadingDetailPost,
    isRefetching: isRefechingDetailPost,
  } = useQueryDetailPost(Number(id))
  const [comment, setComment] = useState('')
  const [openDisclosure, setOpenDisClosure] = useState(false)

  const commentChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value),
    []
  )

  const toggleOpenDisclosure = useCallback(
    () => setOpenDisClosure(!openDisclosure),
    [openDisclosure]
  )

  const submitComment = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createCommentMutation.mutate({ postId: Number(id), comment: comment })
      toast.success('コメントを作成しました')
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

  const openImageModal = useCallback(() => {
    dispatch(setIsOpenImageModal(true))
  }, [dispatch])

  const closeImageModal = useCallback(() => {
    dispatch(setIsOpenImageModal(false))
  }, [dispatch])

  const postUser = useCallback(
    (users: User[] | undefined) =>
      users?.filter((user) => user.id === detailPost?.userId)[0],
    [detailPost]
  )

  return {
    comment,
    commentChange,
    openDisclosure,
    toggleOpenDisclosure,
    detailPost,
    isRefechingDetailPost,
    isLoadingDetailPost,
    isLoadingComment,
    commentsUser,
    submitComment,
    postsComments,
    createCommentMutation,
    id,
    openImageModal,
    closeImageModal,
    isOpenImageModal,
    postUser,
  }
}

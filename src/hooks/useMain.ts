import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ChangeEvent, FormEvent, useCallback } from 'react'
import { toast } from 'react-toastify'
import {
  resetDetailPost,
  resetEditPost,
  selectDetailPost,
  selectEditedPost,
  selectIsOpenDeletePostModal,
  selectLatAndLng,
  selectPostPreview,
  setDetailPost,
  setEditPost,
  setIsOpenDeletePostModal,
  setPostPreview,
} from 'slices/postSlice'
import { CreatePostFormData, Post } from 'types/postType'
import { User } from 'types/userType'
import { useMutationPosts } from './queries/useMutationPosts'
import { useQueryCurrentUser } from './queries/useQueryCurrentUser'
import { useQueryPosts } from './queries/useQueryPosts'
import { useHeader } from './useHeader'

export const useMain = () => {
  const { data: currentUser, isLoading: isLoadingUser } = useQueryCurrentUser()
  const { data: posts, isLoading: isLoadingPosts } = useQueryPosts()
  const dispatch = useAppDispatch()
  const detailUserPost = useAppSelector(selectDetailPost)
  const editedPost = useAppSelector(selectEditedPost)
  const latAndLng = useAppSelector(selectLatAndLng)
  const isOpenDeletePostModal = useAppSelector(selectIsOpenDeletePostModal)
  const { createPostMutation, deletePostMutation } = useMutationPosts()
  const postPreview = useAppSelector(selectPostPreview)
  const { closeCreatePostModal } = useHeader()

  const formatDate = (date: string) => {
    const formedDate = new Date(date)
    const y = formedDate.getFullYear()
    const M = ('00' + (formedDate.getMonth() + 1)).slice(-2)
    const d = ('00' + formedDate.getDate()).slice(-2)
    const h = ('00' + formedDate.getHours()).slice(-2)
    const m = ('00' + formedDate.getMinutes()).slice(-2)
    return `${y}/${M}/${d} ${h}:${m}`
  }

  const changePost = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name
      const value = e.target.value
      dispatch(setEditPost({ ...editedPost, [name]: value }))
    },
    [dispatch, editedPost]
  )

  const changeBody = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      dispatch(setEditPost({ ...editedPost, body: e.target.value })),
    [dispatch, editedPost]
  )

  const uploadPostImage = useCallback(
    (e) => {
      const file = e.target.files[0] as string
      dispatch(setEditPost({ ...editedPost, image: file }))
    },
    [dispatch, editedPost]
  )

  const previewImage = useCallback(
    (e) => {
      const file = e.target.files[0] as string
      dispatch(setPostPreview(window.URL.createObjectURL(file)))
    },
    [dispatch]
  )

  const postImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      uploadPostImage(e)
      previewImage(e)
    },
    [uploadPostImage, previewImage]
  )

  const resetPostPreview = useCallback(
    () => dispatch(setPostPreview('')),
    [dispatch]
  )

  const createFormData = useCallback((): CreatePostFormData => {
    const formData = new FormData()
    formData.append('title', editedPost.title)
    formData.append('body', editedPost.body)
    formData.append('prefecture', editedPost.prefecture)
    formData.append('city', editedPost.city)
    formData.append('town', editedPost.town)
    formData.append('lat', String(latAndLng.lat))
    formData.append('lng', String(latAndLng.lng))
    formData.append('image', editedPost.image)

    return formData
  }, [editedPost, latAndLng])

  const submitPost = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = createFormData()
      createPostMutation.mutate(data)
      toast.success('投稿に成功しました。')
      closeCreatePostModal()
      dispatch(resetEditPost())
    },
    [createFormData, createPostMutation, dispatch, closeCreatePostModal]
  )

  const usersPost = useCallback(
    (user: User | undefined) =>
      posts?.filter((post) => post.userId === user?.id),
    [posts]
  )

  const closeDeletePostModal = useCallback(() => {
    dispatch(setIsOpenDeletePostModal(false))
    dispatch(resetDetailPost())
  }, [dispatch])

  const openDeletePostModal = useCallback(
    (post: Post) => () => {
      dispatch(setIsOpenDeletePostModal(true))
      dispatch(setDetailPost(post))
    },
    [dispatch]
  )

  const deletePost = useCallback(
    (id: number) => () => {
      deletePostMutation.mutate(id)
      closeDeletePostModal()
      toast.success('削除に成功しました')
    },
    [closeDeletePostModal, deletePostMutation]
  )
  const validationCreatePost = useCallback(
    () =>
      !editedPost.title ||
      !editedPost.prefecture ||
      !editedPost.city ||
      !editedPost.town,
    [editedPost]
  )

  return {
    posts,
    postPreview,
    currentUser,
    isLoadingPosts,
    isLoadingUser,
    changePost,
    changeBody,
    editedPost,
    usersPost,
    submitPost,
    postImageChange,
    resetPostPreview,
    formatDate,
    isOpenDeletePostModal,
    closeDeletePostModal,
    openDeletePostModal,
    deletePost,
    validationCreatePost,
    detailUserPost,
  }
}

import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ChangeEvent, FormEvent, useCallback } from 'react'
import { toast } from 'react-toastify'
import {
  resetEditPost,
  selectEditedPost,
  selectPostPreview,
  setEditPost,
  setPostPreview,
} from 'slices/postSlice'
import { CreatePostFormData } from 'types/postType'
import { User } from 'types/userType'
import { useMutationPosts } from './queries/useMutationPosts'
import { useQueryCurrentUser } from './queries/useQueryCurrentUser'
import { useQueryPosts } from './queries/useQueryPosts'
import { useHeader } from './useHeader'

export const useMain = () => {
  const { data: currentUser, isLoading: isLoadingUser } = useQueryCurrentUser()
  const { data: posts, isLoading: isLoadingPosts } = useQueryPosts()
  const dispatch = useAppDispatch()
  const editedPost = useAppSelector(selectEditedPost)
  const { createPostMutation, updatePostMutation } = useMutationPosts()
  const postPreview = useAppSelector(selectPostPreview)
  const { closeCreatePostModal } = useHeader()

  const changePost = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name
      const value = e.target.value
      dispatch(setEditPost({ ...editedPost, [name]: value }))
    },
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
    formData.append('image', editedPost.image)

    return formData
  }, [editedPost])

  const submitPost = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = createFormData()
      if (editedPost.id === 0) {
        createPostMutation.mutate(data)
        toast.success('投稿に成功しました。')
      } else {
        updatePostMutation.mutate({ id: editedPost.id, formData: data })
      }
      closeCreatePostModal()
      dispatch(resetEditPost())
    },
    [
      createFormData,
      createPostMutation,
      updatePostMutation,
      dispatch,
      closeCreatePostModal,
      editedPost.id,
    ]
  )

  const usersPost = useCallback(
    (user: User) => posts?.filter((post) => post.userId === user.id),
    [posts]
  )

  return {
    posts,
    postPreview,
    currentUser,
    isLoadingPosts,
    isLoadingUser,
    changePost,
    editedPost,
    usersPost,
    submitPost,
    postImageChange,
    resetPostPreview,
  }
}

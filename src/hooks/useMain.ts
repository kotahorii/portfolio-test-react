import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ChangeEvent, FormEvent, useCallback } from 'react'
import { toast } from 'react-toastify'
import { selectEditedPost, setEditPost } from 'slices/postSlice'
import { CreatePostFormData } from 'types/postType'
import { User } from 'types/userType'
import { useMutationPosts } from './queries/useMutationPosts'
import { useQueryCurrentUser } from './queries/useQueryCurrentUser'
import { useQueryPosts } from './queries/useQueryPosts'

export const useMain = () => {
  const { data: currentUser, isLoading: isLoadingUser } = useQueryCurrentUser()
  const { data: posts, isLoading: isLoadingPosts } = useQueryPosts()
  const dispatch = useAppDispatch()
  const editedPost = useAppSelector(selectEditedPost)
  const { createPostMutation, updatePostMutation } = useMutationPosts()

  const changePost = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name
      const value = e.target.value
      dispatch(setEditPost({ ...editedPost, [name]: value }))
    },
    [dispatch, editedPost]
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
        toast.success('Success to create !')
      } else {
        updatePostMutation.mutate({ id: editedPost.id, formData: data })
      }
    },
    [createFormData, createPostMutation, updatePostMutation, editedPost.id]
  )

  const usersPost = useCallback(
    (user: User) => posts?.filter((post) => post.userId === user.id),
    [posts]
  )

  return {
    posts,
    currentUser,
    isLoadingPosts,
    isLoadingUser,
    changePost,
    editedPost,
    usersPost,
    submitPost,
  }
}

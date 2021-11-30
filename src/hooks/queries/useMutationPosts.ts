import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { CreatePostFormData, Post, UpdatePostFormData } from 'types/postType'

type UpdateData = {
  id: number
  formData: UpdatePostFormData
}

export const useMutationPosts = () => {
  const queryClient = useQueryClient()
  const createPostMutation = useMutation(
    (data: CreatePostFormData) =>
      client.post<Post>('posts', data, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res) => {
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>('posts', [
            res.data,
            ...previousPosts,
          ])
        }
      },
    }
  )
  const updatePostMutation = useMutation(
    (data: UpdateData) => client.put(`posts/${data.id}`, data.formData),
    {
      onSuccess: (res, variable) => {
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>(
            'posts',
            previousPosts.map((post) =>
              post.id === variable.id ? res.data : post
            )
          )
        }
      },
    }
  )
  const deletePostMutation = useMutation(
    (id: number) => client.delete(`posts/${id}`),
    {
      onSuccess: (res, variable) => {
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>(
            'posts',
            previousPosts.filter((Post) => Post.id !== variable)
          )
        }
      },
    }
  )

  return { createPostMutation, updatePostMutation, deletePostMutation }
}

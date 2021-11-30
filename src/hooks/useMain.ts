import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectEditedPost } from 'slices/postSlice'
import { useQueryCurrentUser } from './queries/useQueryCurrentUser'
import { useQueryPosts } from './queries/useQueryPosts'

export const useMain = () => {
  const { data: currentUser, isLoading: isLoadingUser } = useQueryCurrentUser()
  const { data: posts, isLoading: isLoadingPosts } = useQueryPosts()
  const dispatch = useAppDispatch()
  const editedpost = useAppSelector(selectEditedPost)

  return {}
}

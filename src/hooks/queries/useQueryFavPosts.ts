import Cookies from 'js-cookie'
import client from 'lib/client'
import { useQuery } from 'react-query'
import { Post } from 'types/postType'

const getFavPosts = async () => {
  const { data } = await client.get<Post[]>('posts/fav_sort', {
    headers: {
      'access-token': Cookies.get('_access_token') as string,
      client: Cookies.get('_client') as string,
      uid: Cookies.get('_uid') as string,
    },
  })
  return data
}
export const useQueryFavUsers = () => {
  return useQuery<Post[], Error>({
    queryKey: 'posts',
    queryFn: getFavPosts,
    staleTime: Infinity,
    enabled: false,
  })
}

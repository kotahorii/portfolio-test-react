import { prefectures } from 'data/prefecture'
import { useSearch } from 'hooks/useSearch'
import { VFC } from 'react'
import { Post } from 'types/postType'
import { LoadingCard } from '../card/LoadingCard'
import { PostCard } from '../card/PostCard'

type Props = {
  posts: Post[] | undefined
}

export const PostsList: VFC<Props> = ({ posts }) => {
  const {
    filteredPosts,
    searchPrefecture,
    isLoadingFavPosts,
    isLoadingRateAve,
    isLoadingRatePosts,
  } = useSearch()
  if (isLoadingFavPosts || isLoadingRatePosts || isLoadingRateAve)
    return (
      <>
        {[...Array(5)]
          .map((_, i) => i)
          ?.map((i) => (
            <LoadingCard key={i} />
          ))}
      </>
    )
  return (
    <>
      {filteredPosts(posts)
        ?.map((post) =>
          post?.prefecture === prefectures[searchPrefecture - 1] ||
          prefectures[searchPrefecture - 1] === '都道府県を選択'
            ? post
            : undefined
        )
        .filter((data) => data !== undefined)
        .map((post) =>
          !post ? null : <PostCard key={post?.id} post={post} />
        )}
    </>
  )
}

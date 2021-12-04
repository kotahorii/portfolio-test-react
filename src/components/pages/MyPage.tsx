import { SelectModeButton } from 'components/atoms/button/SelectModeMutton'
import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { PostCard } from 'components/organisms/card/PostCard'
import { Layout } from 'components/templates/Layout'
import { useLikes } from 'hooks/useLikes'
import { useMain } from 'hooks/useMain'
import { useMyPage } from 'hooks/useMyPage'
import { useSearch } from 'hooks/useSearch'
import React from 'react'

export const MyPage = () => {
  const { isLoadingUser, isLoadingPosts, posts } = useMain()
  const { isLoadingFavorites } = useLikes()
  const { isLoadingLabels } = useSearch()
  const { changePostsMode, postsMode, likedPost, myPost, myPrefecturePosts } =
    useMyPage()

  if (isLoadingPosts || isLoadingUser || isLoadingLabels || isLoadingFavorites)
    return (
      <Layout>
        <div className="flex flex-col w-full items-center justify-center">
          {[...Array(18)]
            .map((_, i) => i)
            ?.map((i) => (
              <LoadingCard key={i} />
            ))}
        </div>
      </Layout>
    )
  return (
    <Layout>
      <div className="flex flex-row space-x-1">
        <SelectModeButton
          postsMode={postsMode}
          onClick={changePostsMode('myPosts')}
          mode="myPosts"
        >
          My posts
        </SelectModeButton>
        <SelectModeButton
          postsMode={postsMode}
          onClick={changePostsMode('likedPosts')}
          mode="likedPosts"
        >
          Liked books
        </SelectModeButton>
        <SelectModeButton
          postsMode={postsMode}
          onClick={changePostsMode('myPrefecturePosts')}
          mode="myPrefecturePosts"
        >
          My prefecture posts
        </SelectModeButton>
      </div>

      <div className="flex flex-col w-full items-center justify-center">
        {postsMode === 'likedPosts' &&
          likedPost()?.map((post) => <PostCard key={post.id} post={post} />)}
        {postsMode === 'myPosts' &&
          myPost()?.map((post) => <PostCard key={post.id} post={post} />)}
        {postsMode === 'myPrefecturePosts' &&
          myPrefecturePosts()?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
      </div>
    </Layout>
  )
}

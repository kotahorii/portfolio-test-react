import { LoadingCard } from 'components/organisms/main/LoadingCard'
import { PostCard } from 'components/organisms/main/PostCard'
import { Layout } from 'components/templates/Layout'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'

export const Main = memo(() => {
  const { isLoadingUser, isLoadingPosts, posts } = useMain()

  if (isLoadingPosts || isLoadingUser)
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
      <div className="flex flex-col w-full items-center justify-center">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  )
})

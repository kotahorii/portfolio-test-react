import { LoadingCard } from 'components/organisms/main/LoadingCard'
import { Layout } from 'components/templates/Layout'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'

export const Main = memo(() => {
  const { posts, isLoadingUser, isLoadingPosts } = useMain()

  if (isLoadingPosts || isLoadingUser)
    return (
      <Layout>
        <div className="md:flex md:flex-wrap md:items-center justify-center block">
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
      <div className="md:flex md:flex-wrap md:items-center justify-center block">
        {[...Array(18)]
          .map((_, i) => i)
          ?.map((i) => (
            <LoadingCard key={i} />
          ))}
      </div>
    </Layout>
  )
})

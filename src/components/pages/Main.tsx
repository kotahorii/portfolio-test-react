import { CustomInput } from 'components/atoms/form/CustomInput'
import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { PostCard } from 'components/organisms/card/PostCard'
import { Layout } from 'components/templates/Layout'
import { useLabel } from 'hooks/useLabel'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'

export const Main = memo(() => {
  const { isLoadingUser, isLoadingPosts, posts } = useMain()
  const {
    searchedLabel,
    changeSearchedLabel,
    isLoadingLabels,
    filteredPosts,
  } = useLabel()

  if (isLoadingPosts || isLoadingUser || isLoadingLabels)
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
      <div className="w-1/3">
        <CustomInput
          name="search"
          placeholder="タグで絞り込み"
          value={searchedLabel}
          onChange={changeSearchedLabel}
        />
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        {filteredPosts(posts)?.map((post) =>
          !post ? null : <PostCard key={post?.id} post={post} />
        )}
      </div>
    </Layout>
  )
})

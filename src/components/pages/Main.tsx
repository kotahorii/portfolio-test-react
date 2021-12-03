import { CustomInput } from 'components/atoms/form/CustomInput'
import { LoadingCard } from 'components/organisms/card/LoadingCard'
import { PostCard } from 'components/organisms/card/PostCard'
import { Layout } from 'components/templates/Layout'
import { useSearch } from 'hooks/useSearch'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { CustomSelector } from 'components/atoms/form/CustomSelector'
import { prefectures } from 'data/prefecture'
import { useLikes } from 'hooks/useLikes'

export const Main = memo(() => {
  const { isLoadingUser, isLoadingPosts, posts } = useMain()
  const { isLoadingFavorites } = useLikes()
  const {
    searchedLabel,
    changeSearchedLabel,
    isLoadingLabels,
    filteredPosts,
    searchPrefecture,
    changeSearchPrefecture,
  } = useSearch()

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
      <div className=" flex flex-row space-x-1 w-5/12 items-center">
        <div className="w-96">
          <CustomInput
            name="search"
            placeholder="タグで絞り込み"
            value={searchedLabel}
            onChange={changeSearchedLabel}
          />
        </div>
        <div className=" w-56">
          <CustomSelector
            value={searchPrefecture}
            onChange={changeSearchPrefecture}
            arrays={prefectures}
          />
        </div>
        <div className="w-10"></div>
        <p className="w-40">
          {posts &&
            filteredPosts(posts)?.map((post) =>
              post?.prefecture === prefectures[searchPrefecture - 1] ||
              prefectures[searchPrefecture - 1] === '都道府県を選択'
                ? post
                : undefined
            ).length}
          件の結果
        </p>
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        {posts &&
          filteredPosts(posts)
            ?.map((post) =>
              post?.prefecture === prefectures[searchPrefecture - 1] ||
              prefectures[searchPrefecture - 1] === '都道府県を選択'
                ? post
                : undefined
            )
            .map((post) =>
              !post ? null : <PostCard key={post?.id} post={post} />
            )}
      </div>
    </Layout>
  )
})

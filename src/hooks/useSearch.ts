import { ChangeEvent, useCallback, useState } from 'react'
import { Label, Post } from 'types/postType'
import { useMutationLabels } from './queries/useMutationLabels'
import { useQueryFavPosts } from './queries/useQueryFavPosts'
import { useQueryRatePosts } from './queries/useQueryRatePosts'
import { useQueryRateAve } from './queries/useQueryRateAve'
import { useQueryLabels } from './queries/useQueryLabel'
import { useDetailPost } from './useDetailPost'
import { useMain } from './useMain'

export const useSearch = () => {
  const { data: labels, isLoading: isLoadingLabels } = useQueryLabels()
  const { id } = useDetailPost()
  const { createLabelMutation, deleteLabelMutation } = useMutationLabels()
  const {
    data: favPostsData,
    refetch: refetchFavPosts,
    isRefetching: isRefetchingFavPosts,
  } = useQueryFavPosts()
  const {
    data: ratePostsData,
    refetch: refetchRatePosts,
    isRefetching: isRefetchingRatePosts,
  } = useQueryRatePosts()
  const {
    data: rateAveData,
    refetch: refetchRateAve,
    isRefetching: isRefetchingRateAve,
  } = useQueryRateAve()

  const { posts } = useMain()
  const [labelName, setLabelName] = useState('')
  const [searchedLabel, setSearchedLabel] = useState('')
  const [searchPrefecture, setSearchPrefecture] = useState(1)
  const [choice, setChoice] = useState('')
  const changeLabel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setLabelName(e.target.value),
    []
  )
  const createLabel = useCallback(() => {
    createLabelMutation.mutate({ postId: Number(id), name: labelName })
    setLabelName('')
  }, [id, labelName, createLabelMutation])
  const deleteLabel = useCallback(
    (label: Label) => () => deleteLabelMutation.mutate(label.id),
    [deleteLabelMutation]
  )
  const postsLabels = useCallback(
    (post: Post | undefined) =>
      labels?.filter((label) => label.postId === post?.id),
    [labels]
  )
  const labelsPosts = useCallback(
    (label: Label) => posts?.filter((post) => post.id === label.postId),
    [posts]
  )
  const changeSearchedLabel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearchedLabel(e.target.value),
    []
  )
  const searchLabels =
    !labels || searchedLabel === ''
      ? []
      : Array.from(
          new Set(
            labels
              .filter((label) => label.name.includes(searchedLabel))
              .map((label) => label.postId)
          )
        )
  const filteredPosts = (posts: Post[] | undefined) =>
    posts?.map((post) =>
      searchLabels.includes(post.id) || searchedLabel === '' ? post : undefined
    )
  const changeSearchPrefecture = (e: ChangeEvent<{ value: unknown }>) =>
    setSearchPrefecture(e.target.value as number)

  const RadioData = [
    {
      name: '投稿が新しい順',
      value: 1,
      checked: true,
      onClick: () => setChoice('投稿が新しい順'),
    },
    {
      name: 'いいねが多い順',
      value: 2,
      checked: false,
      onClick: () => {
        refetchFavPosts()
        setChoice('いいねが多い順')
      },
    },
    {
      name: '評価が高い順',
      value: 3,
      checked: false,
      onClick: () => {
        refetchRateAve()
        setChoice('評価が高い順')
      },
    },
    {
      name: '評価数が多い順',
      value: 4,
      checked: false,
      onClick: () => {
        refetchRatePosts()
        setChoice('評価数が多い順')
      },
    },
  ]

  return {
    labels,
    isLoadingLabels,
    changeLabel,
    labelName,
    createLabel,
    changeSearchedLabel,
    searchLabels,
    searchedLabel,
    deleteLabel,
    postsLabels,
    labelsPosts,
    filteredPosts,
    searchPrefecture,
    changeSearchPrefecture,
    choice,
    isRefetchingFavPosts,
    isRefetchingRatePosts,
    isRefetchingRateAve,
    RadioData,
    favPostsData,
    rateAveData,
    ratePostsData,
  }
}

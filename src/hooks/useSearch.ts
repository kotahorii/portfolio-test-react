import { ChangeEvent, useCallback, useState } from 'react'
import { Label, Post } from 'types/postType'
import { useMutationLabels } from './queries/useMutationLabels'
import { useQueryFavPosts } from './queries/useQueryFavPosts'
import { useQueryRatePosts } from './queries/useQueryRatePosts'
import { useQueryRateAve } from './queries/useQueryRateAve'
import { useQueryLabels } from './queries/useQueryLabel'
import { useDetailPost } from './useDetailPost'
import { useMain } from './useMain'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectSearchedLabel,
  selectSearchPrefecture,
  setSearchedLabel,
  setSearchPrefecture,
} from 'slices/postSlice'

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
  const dispatch = useAppDispatch()
  const searchedLabel = useAppSelector(selectSearchedLabel)
  const searchPrefecture = useAppSelector(selectSearchPrefecture)

  const { posts } = useMain()
  const [labelName, setLabelName] = useState('')
  const [choice, setChoice] = useState('投稿が新しい順')
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
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(setSearchedLabel(e.target.value)),
    [dispatch]
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
    dispatch(setSearchPrefecture(e.target.value as number))

  const [selectedOption, SetSelectedOption] = useState('1')
  const handleOptionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => SetSelectedOption(e.target.value),
    []
  )

  const RadioData = [
    {
      name: '投稿が新しい順',
      value: 1,
      onClick: () => setChoice('投稿が新しい順'),
    },
    {
      name: 'いいねが多い順',
      value: 2,
      onClick: () => {
        refetchFavPosts()
        setChoice('いいねが多い順')
      },
    },
    {
      name: '評価が高い順',
      value: 3,
      onClick: () => {
        refetchRateAve()
        setChoice('評価が高い順')
      },
    },
    {
      name: '評価数が多い順',
      value: 4,
      onClick: () => {
        refetchRatePosts()
        setChoice('評価数が多い順')
      },
    },
  ]

  return {
    selectedOption,
    handleOptionChange,
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

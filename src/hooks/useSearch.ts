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
  selectSelectedOption,
  setSearchedLabel,
  setSearchPrefecture,
  setSelectedOption,
} from 'slices/postSlice'

export const useSearch = () => {
  const { data: labels, isLoading: isLoadingLabels } = useQueryLabels()
  const { id } = useDetailPost()
  const { createLabelMutation, deleteLabelMutation } = useMutationLabels()
  const { data: favPostsData, isLoading: isLoadingFavPosts } =
    useQueryFavPosts()
  const { data: ratePostsData, isLoading: isLoadingRatePosts } =
    useQueryRatePosts()
  const { data: rateAveData, isLoading: isLoadingRateAve } = useQueryRateAve()
  const dispatch = useAppDispatch()
  const searchedLabel = useAppSelector(selectSearchedLabel)
  const searchPrefecture = useAppSelector(selectSearchPrefecture)
  const selectedOption = useAppSelector(selectSelectedOption)

  const { posts } = useMain()
  const [labelName, setLabelName] = useState('')
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
  const searchLabels = useCallback(
    () =>
      !labels || searchedLabel === ''
        ? []
        : Array.from(
            new Set(
              labels
                .filter((label) => label.name.includes(searchedLabel))
                .map((label) => label.postId)
            )
          ),
    [labels, searchedLabel]
  )

  const filteredPosts = useCallback(
    (posts: Post[] | undefined) =>
      posts?.map((post) =>
        searchLabels().includes(post.id) || searchedLabel === ''
          ? post
          : undefined
      ),
    [searchLabels, searchedLabel]
  )
  const changeSearchPrefecture = useCallback(
    (e: ChangeEvent<{ value: unknown }>) =>
      dispatch(setSearchPrefecture(e.target.value as number)),
    [dispatch]
  )

  const handleOptionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(setSelectedOption(e.target.value)),
    [dispatch]
  )
  const labelPostLoading = useCallback(
    () => createLabelMutation.isLoading,
    [createLabelMutation]
  )

  return {
    selectedOption,
    handleOptionChange,
    labels,
    isLoadingLabels,
    changeLabel,
    labelName,
    createLabel,
    changeSearchedLabel,
    searchedLabel,
    deleteLabel,
    postsLabels,
    labelsPosts,
    filteredPosts,
    searchPrefecture,
    changeSearchPrefecture,
    isLoadingFavPosts,
    isLoadingRatePosts,
    isLoadingRateAve,
    favPostsData,
    rateAveData,
    ratePostsData,
    labelPostLoading,
  }
}

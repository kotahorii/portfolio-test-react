import { ChangeEvent, useCallback, useState } from 'react'
import { Label, Post } from 'types/postType'
import { useMutationLabels } from './queries/useMutationLabels'
import { useQueryLabels } from './queries/useQueryLabel'
import { useDetailPost } from './useDetailPost'
import { useMain } from './useMain'

export const useLabel = () => {
  const { data: labels, isLoading: isLoadingLabels } = useQueryLabels()
  const { id } = useDetailPost()
  const { createLabelMutation, deleteLabelMutation } = useMutationLabels()
  const { posts } = useMain()
  const [labelName, setLabelName] = useState('')
  const [searchedLabel, setSearchedLabel] = useState('')
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
  const searchLabels = labels?.filter((label) =>
    label.name.includes(searchedLabel)
  )

  return {
    labels,
    isLoadingLabels,
    changeLabel,
    labelName,
    createLabel,
    changeSearchedLabel,
    searchLabels,
    deleteLabel,
    postsLabels,
    labelsPosts,
  }
}

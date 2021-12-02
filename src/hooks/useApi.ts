import { ChangeEvent, useCallback, useState } from 'react'
import { useQueryAddress } from 'hooks/queries/useQueryAddress'
import { useMutateHotPepper } from './queries/useMutationHotPepper'
import { Post } from 'types/postType'
import { useDetailPost } from './useDetailPost'
import { useQueryRakutenData } from './queries/useQueryRakuten'

export const useApi = () => {
  const [address, setAddress] = useState('')
  const { detailPost } = useDetailPost()

  const changeAddress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }, [])
  const validatedAddress = address
    .replace(/\s+/g, '')
    .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]/g, '-')

  const {
    data: addressData,
    isLoading: isLoadingAddress,
    isRefetching: isRefetchingAddress,
    refetch: refetchAddress,
  } = useQueryAddress(validatedAddress)
  const { postHotPepperParams } = useMutateHotPepper()
  const isLoadingHotPepper = postHotPepperParams.isLoading
  const hotPepperKeyword = useCallback(
    (post: Post | undefined) =>
      post?.prefecture && post?.city && post?.town
        ? encodeURI(post.prefecture + post.city + post.town.split('町')[0])
        : '',
    []
  )
  const rakutenKeyword = useCallback(
    (post: Post | undefined) =>
      post?.prefecture && post?.city
        ? encodeURI(post.prefecture + post.city)
        : '',
    []
  )
  const {
    data: rakutenData,
    refetch: refetchRakutenData,
    isRefetching: isRefetchingRakuten,
    isLoading: isLoadingRakuten,
    isError,
  } = useQueryRakutenData(rakutenKeyword(detailPost))

  const setAddressData = useCallback(() => {
    refetchAddress()
  }, [refetchAddress])
  const isNotValidData = useCallback(
    (data: string) => {
      const pattern1 = /^[0-9]{3}-[0-9]{4}$/
      const pattern2 = /^[0-9]{7}$/
      return (
        !pattern1.test(validatedAddress) && !pattern2.test(validatedAddress)
      )
    },
    [validatedAddress]
  )

  const refetchData = useCallback(() => {
    refetchRakutenData()
    postHotPepperParams.mutate(hotPepperKeyword(detailPost))
  }, [refetchRakutenData, hotPepperKeyword, postHotPepperParams, detailPost])

  return {
    isNotValidData,
    isError,
    isLoadingAddress,
    isRefetchingAddress,
    isLoadingRakuten,
    isRefetchingRakuten,
    isLoadingHotPepper,
    validatedAddress,
    address,
    changeAddress,
    rakutenData,
    setAddressData,
    addressData,
    refetchData,
  }
}

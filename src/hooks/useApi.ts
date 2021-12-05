import { ChangeEvent, useCallback, useState } from 'react'
import { useQueryAddress } from 'hooks/queries/useQueryAddress'
import { useMutateHotPepper } from './queries/useMutationHotPepper'
import { Post } from 'types/postType'
import { useDetailPost } from './useDetailPost'
import { useQueryRakutenData } from './queries/useQueryRakuten'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Geocede from 'react-geocode'
import {
  selectEditedPost,
  selectIsOpenHotelModal,
  selectIsOpenShopModal,
  setEditPost,
  setIsOpenHotelModal,
  setIsOpenShopModal,
} from 'slices/postSlice'

Geocede.setApiKey(`${process.env.REACT_APP_GOOGLE_MAP_API}`)
Geocede.setLanguage('ja')
Geocede.setRegion('ja')

export const useApi = () => {
  const [address, setAddress] = useState('')
  const { detailPost } = useDetailPost()
  const dispatch = useAppDispatch()
  const editedPost = useAppSelector(selectEditedPost)
  const isOpenShopModal = useAppSelector(selectIsOpenShopModal)
  const isOpenHotelModal = useAppSelector(selectIsOpenHotelModal)

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

  const geocode = useCallback(() => {
    Geocede.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location
        dispatch(setEditPost({ ...editedPost, lat: lat, lng: lng }))
      },
      (err) => {
        console.log(err)
      }
    )
  }, [address, dispatch, editedPost])

  const setAddressData = useCallback(() => {
    refetchAddress()
    geocode()
  }, [refetchAddress, geocode])
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

  const openShopModal = useCallback(() => {
    dispatch(setIsOpenShopModal(true))
    postHotPepperParams.mutate(hotPepperKeyword(detailPost))
  }, [dispatch, postHotPepperParams, detailPost, hotPepperKeyword])

  const closeShopModal = useCallback(() => {
    dispatch(setIsOpenShopModal(false))
  }, [dispatch])

  const openHotelModal = useCallback(() => {
    dispatch(setIsOpenHotelModal(true))
    refetchRakutenData()
  }, [dispatch, refetchRakutenData])

  const closeHotelModal = useCallback(() => {
    dispatch(setIsOpenHotelModal(false))
  }, [dispatch])

  return {
    isOpenShopModal,
    openShopModal,
    closeShopModal,
    isOpenHotelModal,
    openHotelModal,
    closeHotelModal,
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
  }
}

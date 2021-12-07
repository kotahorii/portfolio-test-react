import { useAppDispatch } from 'app/hooks'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { setIsOpenShopModal } from 'slices/postSlice'
import { HotPepperQueryType, HotPepperRes } from 'types/apiTypes'

export const useMutateHotPepper = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const postHotPepperParams = useMutation(
    (key: string) =>
      axios.post<HotPepperRes>(`${process.env.REACT_APP_HOTPEPPER_URL}`, {
        key: key,
      }),
    {
      onSuccess: (res) => {
        if (!res.data.results.shop) {
          queryClient.setQueryData('hotPepper', [])
        } else {
          queryClient.setQueryData<HotPepperQueryType>('hotPepper', [
            ...res.data.results.shop,
          ])
        }
        dispatch(setIsOpenShopModal(true))
      },
    }
  )
  return { postHotPepperParams }
}

import { useApi } from 'hooks/useApi'
import { memo } from 'react'
import { useQueryClient } from 'react-query'
import { HotPepperQueryType } from 'types/apiTypes'
import { HotelRestaurantCard } from '../card/HotelRestaurantCard'
import { LoadingHotelCard } from '../card/LoadingHotelCard'

export const ShopModal = memo(() => {
  const { isLoadingHotPepper } = useApi()
  const queryClient = useQueryClient()
  const hotPepperData =
    queryClient.getQueryData<HotPepperQueryType>('hotPepper')

  return (
    <ul className="flex flex-col overflow-auto space-y-2 w-full h-96 p-2">
      {isLoadingHotPepper
        ? [...Array(4)]
            .map((_, i) => i)
            ?.map((i) => <LoadingHotelCard key={i} />)
        : hotPepperData?.map((hotPepper) => (
            <HotelRestaurantCard
              key={hotPepper.id}
              src={hotPepper.photo.pc.l}
              href={hotPepper.urls.pc}
              title={hotPepper.name}
              genre={`${hotPepper.genre.name}${
                hotPepper.sub_genre?.name !== undefined
                  ? '・' + hotPepper.sub_genre.name
                  : ''
              }`}
              special={hotPepper.catch}
              address={hotPepper.address}
            />
          ))}
    </ul>
  )
})

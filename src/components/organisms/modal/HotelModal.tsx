import { useApi } from 'hooks/useApi'
import { HotelRestaurantCard } from '../card/HotelRestaurantCard'
import { LoadingHotelCard } from '../card/LoadingHotelCard'

export const HotelModal = () => {
  const { rakutenData, isLoadingRakuten, isRefetchingRakuten } = useApi()
  return (
    <ul className="flex flex-col overflow-auto space-y-2 w-full h-96 bg-green-200 rounded-lg p-2">
      {isLoadingRakuten || isRefetchingRakuten
        ? [...Array(4)]
            .map((_, i) => i)
            ?.map((i) => <LoadingHotelCard key={i} />)
        : rakutenData?.map((rakuten) => (
            <HotelRestaurantCard
              key={rakuten.hotel[0].hotelBasicInfo?.hotelNo}
              src={rakuten.hotel[0].hotelBasicInfo?.hotelImageUrl}
              href={rakuten.hotel[0].hotelBasicInfo?.hotelInformationUrl}
              reviewUrl={rakuten.hotel[0].hotelBasicInfo?.reviewUrl}
              title={rakuten.hotel[0].hotelBasicInfo?.hotelName}
              special={rakuten.hotel[0].hotelBasicInfo?.hotelSpecial}
              address={`${rakuten.hotel[0].hotelBasicInfo?.address1}${rakuten.hotel[0].hotelBasicInfo?.address2}`}
            />
          ))}
    </ul>
  )
}

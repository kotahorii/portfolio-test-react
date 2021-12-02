import axios from 'axios'
import { useQuery } from 'react-query'
import { AddressQueryType, AddressRes } from 'types/apiTypes'

const getAddressData = async (address: string) => {
  const { data } = await axios.get<AddressRes>(
    `${process.env.REACT_APP_ADDRESS_URL}${address}`
  )
  return data.results[0]
}

export const useQueryAddress = (address: string) => {
  return useQuery<AddressQueryType, Error>({
    queryKey: 'address',
    queryFn: () => getAddressData(address),
    staleTime: Infinity,
    enabled: false,
  })
}

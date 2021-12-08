import { CheckCircleIcon } from '@heroicons/react/solid'
import { useLikes } from 'hooks/useLikes'
import { useRates } from 'hooks/useRate'
import { VFC } from 'react'
import { User } from 'types/userType'

type Props = {
  user?: User
}
export const CustomBadge: VFC<Props> = ({ user }) => {
  const { getAllRate } = useRates()
  const { getAllFav } = useLikes()
  const color = () =>
    getAllFav(user)! >= 1 &&
    getAllRate(user)! >= 1 &&
    getAllFav(user)! < 5 &&
    getAllRate(user)! < 5
      ? 'text-red-700 bg-red-100'
      : getAllFav(user)! >= 5 &&
        getAllRate(user)! >= 5 &&
        getAllFav(user)! < 10 &&
        getAllRate(user)! < 10
      ? 'text-gray-400 bg-gray-100'
      : getAllFav(user)! >= 10 && getAllRate(user)! >= 10
      ? 'text-yellow-400 bg-yellow-100'
      : 'hidden'

  return (
    <CheckCircleIcon
      className={`absolute w-5 -bottom-1 -right-1 ${color()} rounded-full`}
    />
  )
}

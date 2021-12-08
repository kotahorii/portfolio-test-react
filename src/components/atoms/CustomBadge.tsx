import { CheckCircleIcon } from '@heroicons/react/solid'
import { VFC } from 'react'
import { User } from 'types/userType'

type Props = {
  user?: User
  color: string
  bgColor: string
}
export const CustomBadge: VFC<Props> = ({ user, color, bgColor }) => {
  return (
    <CheckCircleIcon
      className={`absolute w-5 -bottom-1 -right-1 ${color} ${bgColor} z-10 rounded-full`}
    />
  )
}

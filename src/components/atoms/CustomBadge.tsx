import { CheckCircleIcon } from '@heroicons/react/solid'
import { VFC } from 'react'
import { User } from 'types/userType'

type Props = {
  user?: User
  color: `text-${string}-${number}`
  bgColor: `bg-${string}-${number}`
}
export const CustomBadge: VFC<Props> = ({ user, color, bgColor }) => {
  return (
    <CheckCircleIcon
      className={`absolute w-5 -bottom-1 -right-1 ${color} ${bgColor} rounded-full`}
    />
  )
}

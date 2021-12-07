import { memo, VFC } from 'react'
import { User } from 'types/userType'
import { UserIconWithNoPing } from './UserIconWithNoPing'

type Props = {
  user: User | undefined
}

export const CustomUserIcon: VFC<Props> = memo(({ user }) => {
  return (
    <div className="w-16 h-16 relative flex flex-col justify-center items-center">
      <span className="flex h-3 w-3 absolute right-1.5 top-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
      </span>
      <UserIconWithNoPing user={user} />
    </div>
  )
})

import { UserCircleIcon } from '@heroicons/react/solid'
import { memo, VFC } from 'react'
import { User } from 'types/userType'

type Props = {
  user: User | undefined
}

export const CustomUserIcon: VFC<Props> = memo(({ user }) => {
  return (
    <div className="w-16 h-16 relative">
      <span className="flex h-3 w-3 absolute right-1.5 top-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
      </span>
      {user?.image.url ? (
        <img
          className={`object-cover w-16 h-16 rounded-full`}
          alt="avatar"
          src={user?.image.url}
        />
      ) : (
        <UserCircleIcon className="rounded-full text-gray-200" />
      )}
    </div>
  )
})

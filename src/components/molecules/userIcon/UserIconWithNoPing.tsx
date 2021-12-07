import { UserCircleIcon } from '@heroicons/react/solid'
import { VFC } from 'react'
import { User } from 'types/userType'

type Props = {
  user: User | undefined
}
export const UserIconWithNoPing: VFC<Props> = ({ user }) => {
  return (
    <>
      {user?.image.url !== null ? (
        <div className="relative">
          <img
            className="rounded-full object-cover w-14 h-14"
            src={user?.image.url}
            alt="user icon"
          />
          <div className="absolute cursor-pointer bg-black w-14 h-14 top-0 rounded-full opacity-0 hover:opacity-10"></div>
        </div>
      ) : (
        <UserCircleIcon className="rounded-full text-gray-200 w-16 h-16" />
      )}
    </>
  )
}

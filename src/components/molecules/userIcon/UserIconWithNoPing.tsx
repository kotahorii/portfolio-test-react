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
        <img
          className="rounded-full object-cover w-14 h-14"
          src={user?.image.url}
          alt="user icon"
        />
      ) : (
        <UserCircleIcon className=" rounded-full text-gray-200 w-16 h-16" />
      )}
    </>
  )
}

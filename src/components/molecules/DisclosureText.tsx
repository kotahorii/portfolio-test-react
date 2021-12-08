import { Disclosure, Transition } from '@headlessui/react'
import { Tooltip } from 'components/atoms/Tooltip'
import { useDetailPost } from 'hooks/useDetailPost'
import { useUsers } from 'hooks/useUsers'
import { memo } from 'react'
import { CustomUserIcon } from './userIcon/CustomUserIcon'

export const DisclosureText = memo(() => {
  const { detailPost, postUser, isLoadingDetailPost } = useDetailPost()
  const { isLoadingUsers, users } = useUsers()

  if (isLoadingUsers || isLoadingDetailPost) return null
  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Disclosure.Panel className=" flex flex-col space-y-2 text-gray-500 break-words border-t border-b border-indigo-400 p-3">
        <div className="flex flex-row space-x-2">
          <Tooltip tooltipText="test">
            <CustomUserIcon user={postUser(users)} />
          </Tooltip>
          <div className="h-14 py-2">
            <p>投稿者</p>
            <p className="font-semibold">{postUser(users)?.name}</p>
          </div>
        </div>
        <p>{detailPost?.body}</p>
      </Disclosure.Panel>
    </Transition>
  )
})

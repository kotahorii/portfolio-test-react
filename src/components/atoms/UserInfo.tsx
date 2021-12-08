import { HeartIcon, StarIcon } from '@heroicons/react/solid'
import { useLikes } from 'hooks/useLikes'
import { useMain } from 'hooks/useMain'
import { useRates } from 'hooks/useRate'
import { memo, ReactNode, useRef, VFC } from 'react'
import { User } from 'types/userType'

type Props = {
  user: User | undefined
  children: ReactNode
}

export const UserInfo: VFC<Props> = memo(({ user, children }) => {
  const { getAllFav } = useLikes()
  const { getAllRate } = useRates()
  const ref = useRef<HTMLDivElement>(null)
  const handleMouseEnter = () => {
    if (!ref.current) return
    ref.current.style.opacity = '1'
    ref.current.style.visibility = 'visible'
  }
  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.opacity = '0'
    ref.current.style.visibility = 'hidden'
  }

  return (
    <div className="flex relative">
      <div
        className="flex flex-col break-words w-56 space-y-2 absolute top-full left-1/2 invisible z-10 py-[2px] p-3 mx-auto my-2 text-white bg-black rounded transition-all duration-200 transform -translate-x-1/2"
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className="text-lg">{user?.name}</p>
        <p>{user?.introduction}</p>
        <div className="flex flex-row space-x-3">
          <div className="flex flex-row space-x-1">
            <HeartIcon className="w-5 text-red-500" />
            <p>
              {getAllFav(user)}
              <span className="ml-1">いいね</span>
            </p>
          </div>
          <div className="flex flex-row space-x-1">
            <StarIcon className="w-5 text-yellow-500" />
            <p>
              {getAllRate(user)}
              <span className="ml-1">件のレビュー</span>
            </p>
          </div>
        </div>
      </div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
    </div>
  )
})

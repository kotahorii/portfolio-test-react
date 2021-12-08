import { memo, ReactNode, useRef, VFC } from 'react'
import { User } from 'types/userType'

type Props = {
  user: User | undefined
  children: ReactNode
}

export const UserInfo: VFC<Props> = memo(({ user, children }) => {
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
        className="flex flex-col break-words w-44 space-y-2 absolute top-full left-1/2 invisible z-10 py-[2px] p-3 mx-auto my-2 text-xs text-white bg-black rounded transition-all duration-200 transform -translate-x-1/2"
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className="text-lg">{user?.name}</p>
        <p>{user?.introduction}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      </div>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
    </div>
  )
})

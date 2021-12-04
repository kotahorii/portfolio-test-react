import { ModeType } from 'hooks/useMyPage'
import { ReactNode, VFC } from 'react'

type Props = {
  mode: ModeType
  postsMode: ModeType
  onClick: () => void
  children: ReactNode
}

export const SelectModeButton: VFC<Props> = ({
  mode,
  postsMode,
  children,
  onClick,
}) => {
  return (
    <button
      className="hover:bg-gray-100 relative p-2 rounded-lg"
      onClick={onClick}
    >
      {children}
      {postsMode === mode && (
        <div className="bg-gray-300 absolute left-0 bottom-0 mt-1 rounded-full w-full h-0.5"></div>
      )}
    </button>
  )
}

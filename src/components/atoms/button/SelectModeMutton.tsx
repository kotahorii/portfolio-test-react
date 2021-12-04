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
      className="hover:bg-gray-200 relative p-2 rounded-lg"
      onClick={onClick}
    >
      {children}
      {postsMode === mode && (
        <div className="bg-blue-300 absolute left-0 bottom-0 mt-1 rounded-full w-full h-1"></div>
      )}
    </button>
  )
}

import { memo, VFC } from 'react'
import { RefreshIcon } from '@heroicons/react/outline'

type Props = {
  onClick?: () => void
  color?: string
  hoverColor?: string
  text: string
  type?: 'button' | 'submit' | 'reset'
  disabled: boolean
  loading?: boolean
}

export const CustomButton: VFC<Props> = memo(
  ({ onClick, text, type = 'button', disabled, loading = false }) => {
    return (
      <button
        type={type}
        disabled={disabled}
        className="transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md inline-flex w-full max-w-xs justify-center px-3 py-2 text-sm font-medium border-2 border-indigo-400 rounded-full bg-transparent text-indigo-400 hover:bg-indigo-400 hover:text-gray-50 focus:outline-none"
        onClick={onClick}
      >
        {loading ? <RefreshIcon className="animate-spin w-5" /> : text}
      </button>
    )
  }
)

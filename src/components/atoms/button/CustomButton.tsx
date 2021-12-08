import { memo, VFC } from 'react'
import { RefreshIcon } from '@heroicons/react/outline'

type Props = {
  onClick?: () => void
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
        className="transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md inline-flex w-full max-w-xs justify-center px-3 py-2 text-sm font-medium border-2 border-indigo-600 rounded-full bg-transparent text-indigo-600 hover:border-0 bg-gradient-to-tr hover:from-blue-500 hover:via-indigo-400 hover:to-indigo-500 hover:text-gray-50 focus:outline-none"
        onClick={onClick}
      >
        {loading ? <RefreshIcon className="animate-spin w-5" /> : text}
      </button>
    )
  }
)

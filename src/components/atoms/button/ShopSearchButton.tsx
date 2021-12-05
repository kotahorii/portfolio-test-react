import { VFC } from 'react'

type Props = {
  onClick: () => void
  title: string
}
export const ShopSearchButton: VFC<Props> = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 border-solid border-gray-500 hover:bg-gray-100 focus:outline-none border-2 rounded-lg"
    >
      {title}
    </button>
  )
}

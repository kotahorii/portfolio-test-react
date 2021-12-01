import { XCircleIcon } from '@heroicons/react/outline'
import { useMain } from 'hooks/useMain'
import { memo, VFC } from 'react'

type Props = {
  onClick: () => void
}

export const PostImagePreview: VFC<Props> = memo(({ onClick }) => {
  const { postPreview, resetPostPreview } = useMain()
  return postPreview ? (
    <div className="relative w-60 h-40 px-2 py-2 ">
      <XCircleIcon
        onClick={resetPostPreview}
        className="absolute -right-3 top-1 cursor-pointer w-7 text-gray-300 hover:text-gray-400"
      />
      <div onClick={onClick} className="cursor-pointer w-60 h-40">
        <img
          src={postPreview}
          alt="preview img"
          className=" object-cover w-60 h-40 rounded-lg cursor-pointer shadow-md"
        />
      </div>
    </div>
  ) : (
    <div
      onClick={onClick}
      className="cursor-pointer w-60 h-40 bg-green-200 rounded-lg"
    ></div>
  )
})

import { XCircleIcon } from '@heroicons/react/outline'
import { useMain } from 'hooks/useMain'
import { memo, VFC } from 'react'

type Props = {
  onClick: () => void
}

export const PostImagePreview: VFC<Props> = memo(({ onClick }) => {
  const { postPreview, resetPostPreview } = useMain()
  return postPreview ? (
    <div className="relative md:w-96 md:h-64 w-48 h-32 px-2 py-2 ">
      <XCircleIcon
        onClick={resetPostPreview}
        className="absolute -right-3 top-1 cursor-pointer w-7 text-gray-300 hover:text-gray-400"
      />
      <div
        onClick={onClick}
        className="cursor-pointer md:w-96 md:h-64 w-48 h-32"
      >
        <img
          src={postPreview}
          alt="preview img"
          className=" object-cover md:w-96 md:h-64 w-48 h-32 rounded-lg cursor-pointer shadow-md"
        />
      </div>
    </div>
  ) : (
    <div
      onClick={onClick}
      className="cursor-pointer md:w-96 md:h-64 w-48 h-32 bg-green-200 rounded-lg"
    ></div>
  )
})

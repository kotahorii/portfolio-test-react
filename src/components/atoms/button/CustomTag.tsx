import { XCircleIcon } from '@heroicons/react/solid'
import { useSearch } from 'hooks/useSearch'
import { VFC } from 'react'
import { Label } from 'types/postType'

type Props = {
  label: Label
}

export const CustomTag: VFC<Props> = ({ label }) => {
  const { deleteLabel } = useSearch()
  return (
    <div
      key={label.id}
      className="relative text-center truncate overflow-ellipsis mt-2 px-3 py-1 shadow-sm text-green-800 bg-green-200 hover:bg-green-300 rounded-full"
    >
      <p className="mr-4">{label.name}</p>
      <XCircleIcon
        onClick={deleteLabel(label)}
        className=" absolute cursor-pointer text-green-500 w-5 top-1 right-1"
      />
    </div>
  )
}

import { XCircleIcon } from '@heroicons/react/solid'
import { useMain } from 'hooks/useMain'
import { useSearch } from 'hooks/useSearch'
import { memo, VFC } from 'react'
import { Label } from 'types/postType'

type Props = {
  label: Label
}

export const CustomTag: VFC<Props> = memo(({ label }) => {
  const { deleteLabel } = useSearch()
  const { currentUser } = useMain()
  const { isLoadingLabels } = useSearch()
  if (isLoadingLabels) return null
  return (
    <div
      key={label.id}
      className="relative text-center truncate overflow-ellipsis mt-2 px-3 py-1 shadow-sm text-indigo-800 bg-indigo-200 hover:bg-indigo-300 rounded-full"
    >
      <p className="mr-4">{label.name}</p>
      {label.userId === currentUser?.id && (
        <XCircleIcon
          onClick={deleteLabel(label)}
          className=" absolute cursor-pointer text-indigo-500 w-5 top-1 right-1"
        />
      )}
    </div>
  )
})

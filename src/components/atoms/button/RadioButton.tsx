import { useSearch } from 'hooks/useSearch'
import { VFC } from 'react'

type Props = {
  radioData: {
    name: string
    value: number
    onClick?: () => void
  }[]
}

export const RadioButton: VFC<Props> = ({ radioData }) => {
  const { handleOptionChange, selectedOption } = useSearch()
  return (
    <>
      {radioData.map((data) => (
        <label key={data.value} className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="radio"
            value={data.value}
            onClick={data.onClick}
            checked={Number(selectedOption) === data.value}
            onChange={handleOptionChange}
          />
          <span className="ml-2">{data.name}</span>
        </label>
      ))}
    </>
  )
}
import { memo, VFC } from 'react'

type Props = {
  name: string
  value: string
  placeholder: string
  type?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CustomInput: VFC<Props> = memo(
  ({ name, value, placeholder, onChange, type = 'text' }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className="px-3 py-2 w-full focus:ring-blue-400 bg-gray-100 text-gray-600 rounded-md focus:bg-gray-50"
        name={name}
        value={value}
        onChange={onChange}
      />
    )
  }
)

import { memo, VFC } from 'react'

type Props = {
  name: string
  value: string
  placeholder: string
  type?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export const CustomInput: VFC<Props> = memo(
  ({ name, value, placeholder, onChange, type = 'text', disabled = false }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="px-3 py-2 w-full disabled:cursor-not-allowed focus:outline-none bg-transparent border-b border-indigo-500 text-gray-600 focus:border-b-2 "
        name={name}
        value={value}
        onChange={onChange}
      />
    )
  }
)

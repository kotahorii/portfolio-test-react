import { CustomInput } from 'components/atoms/CustomInput'
import { CustomLabel } from 'components/atoms/CustomLabel'
import { useAuth } from 'hooks/useAuth'
import { memo } from 'react'

export const LoginForm = memo(() => {
  const { changeAuthData, userData } = useAuth()
  return (
    <>
      <CustomLabel title="Email:" />
      <CustomInput
        name="email"
        value={userData.email}
        placeholder="email"
        onChange={changeAuthData}
      />
      <CustomLabel title="Password:" />
      <CustomInput
        name="password"
        value={userData.password}
        type="password"
        placeholder="password"
        onChange={changeAuthData}
      />
    </>
  )
})

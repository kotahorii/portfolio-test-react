import { CustomInput } from 'components/atoms/CustomInput'
import { CustomLabel } from 'components/atoms/CustomLabel'
import { useAuth } from 'hooks/useAuth'
import { memo } from 'react'

export const LoginForm = memo(() => {
  const { changeAuthData, userData } = useAuth()
  return (
    <>
      <CustomLabel title="メールアドレス" />
      <CustomInput
        name="email"
        value={userData.email}
        placeholder="xxx@xxxx.com"
        onChange={changeAuthData}
      />
      <CustomLabel title="パスワード" />
      <CustomInput
        name="password"
        value={userData.password}
        type="password"
        placeholder="６文字以上入力してください"
        onChange={changeAuthData}
      />
    </>
  )
})

import { CustomInput } from 'components/atoms/form/CustomInput'
import { CustomLabel } from 'components/atoms/form/CustomLabel'
import { useAuth } from 'hooks/useAuth'
import { memo } from 'react'

export const LoginForm = memo(() => {
  const { changeAuthData, userData } = useAuth()
  return (
    <>
      <div className=" flex flex-col items-center w-full">
        <CustomLabel title="メールアドレス" />
        <CustomInput
          name="email"
          value={userData.email}
          placeholder="xxx@xxxx.com"
          onChange={changeAuthData}
        />
      </div>
      <div className=" flex flex-col items-center w-full">
        <CustomLabel title="パスワード" />
        <CustomInput
          name="password"
          value={userData.password}
          type="password"
          placeholder="６文字以上入力してください"
          onChange={changeAuthData}
        />
      </div>
    </>
  )
})

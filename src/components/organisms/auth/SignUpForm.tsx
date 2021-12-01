import { CustomInput } from 'components/atoms/CustomInput'
import { CustomLabel } from 'components/atoms/CustomLabel'
import { CustomSelector } from 'components/atoms/CustomSelector'
import { ImageInput } from 'components/molecules/userIcon/ImageInput'
import { prefectures } from 'data/prefecture'
import { useAuth } from 'hooks/useAuth'
import { memo } from 'react'

export const SignUpForm = memo(() => {
  const { userData, changeAuthData, prefectureChange } = useAuth()
  return (
    <>
      <CustomLabel title="名前" />
      <CustomInput
        name="name"
        value={userData.name}
        placeholder="名前を入力"
        onChange={changeAuthData}
      />
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
        placeholder="６文字以上"
        type="password"
        onChange={changeAuthData}
      />
      <CustomLabel title="パスワード（確認用）" />
      <CustomInput
        name="passwordConfirmation"
        value={userData.passwordConfirmation}
        placeholder="６文字以上"
        type="password"
        onChange={changeAuthData}
      />
      <div className="flex flex-row justify-between items-center space-x-3">
        <div className="flex flex-col w-44 space-y-3">
          <CustomLabel title="都道府県" />
          <CustomSelector
            value={userData.prefecture}
            onChange={prefectureChange}
            arrays={prefectures}
          />
        </div>
        <div className="flex flex-row justify-center">
          <ImageInput />
        </div>
      </div>
    </>
  )
})

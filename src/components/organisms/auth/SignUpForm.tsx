import { CustomInput } from 'components/atoms/CustomInput'
import { CustomLabel } from 'components/atoms/CustomLabel'
import { CustomSelector } from 'components/atoms/CustomSelector'
import { ImageInput } from 'components/molecules/ImageInput'
import { prefectures } from 'data/prefecture'
import { useAuth } from 'hooks/useAuth'
import { memo } from 'react'

export const SignUpForm = memo(() => {
  const { userData, changeAuthData, prefectureChange } = useAuth()
  return (
    <div className="flex md:flex-row flex-col items-start md:space-x-5">
      <div className="flex flex-col">
        <CustomLabel title="Name:" />
        <CustomInput
          name="name"
          value={userData.name}
          placeholder="name"
          onChange={changeAuthData}
        />
        <CustomLabel title="Email:" />
        <CustomInput
          name="email"
          value={userData.email}
          placeholder="email"
          onChange={changeAuthData}
        />
      </div>
      <div className="flex flex-col">
        <CustomLabel title="Password:" />
        <CustomInput
          name="password"
          value={userData.password}
          placeholder="password"
          type="password"
          onChange={changeAuthData}
        />
        <CustomLabel title="Password confirmation:" />
        <CustomInput
          name="passwordConfirmation"
          value={userData.passwordConfirmation}
          placeholder="password"
          type="password"
          onChange={changeAuthData}
        />
      </div>
      <div className="flex md:flex-col flex-row items-center md:space-y-3 space-y-0 md:space-x-0 space-x-1">
        <div className="flex flex-col space-y-3">
          <CustomLabel title="Prefecture:" />
          <CustomSelector
            value={userData.prefecture}
            onChange={prefectureChange}
            arrays={prefectures}
          />
        </div>
        <div className="flex flex-row justify-center space-x-3">
          <ImageInput />
        </div>
      </div>
    </div>
  )
})

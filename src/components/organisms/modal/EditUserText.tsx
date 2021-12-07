import { CustomButton } from 'components/atoms/button/CustomButton'
import { CustomInput } from 'components/atoms/form/CustomInput'
import { CustomLabel } from 'components/atoms/form/CustomLabel'
import { CustomSelector } from 'components/atoms/form/CustomSelector'
import { ValidationMessage } from 'components/atoms/form/ValidationMessage'
import { ImageInput } from 'components/molecules/userIcon/ImageInput'
import { prefectures } from 'data/prefecture'
import { useAuth } from 'hooks/useAuth'
import { useUsers } from 'hooks/useUsers'
import { memo } from 'react'

export const EditUserText = memo(() => {
  const { userData, changeAuthData, prefectureChange } = useAuth()
  const { updateUser } = useUsers()
  return (
    <form onSubmit={updateUser} className=" mt-2 flex flex-col space-y-2">
      <CustomLabel title="名前" />
      <CustomInput
        name="name"
        value={userData.name}
        placeholder="名前を入力"
        onChange={changeAuthData}
      />
      <ValidationMessage isError={userData.name.length === 0}>
        名前は必須です
      </ValidationMessage>
      <CustomLabel title="自己紹介" />
      <CustomInput
        name="introduction"
        value={userData.introduction}
        placeholder="自己紹介を入力"
        onChange={changeAuthData}
      />
      <div className="flex flex-row items-center mb-2 justify-between">
        <div className="flex flex-col w-36 space-y-2">
          <CustomLabel title="都道府県" />
          <CustomSelector
            value={userData.prefecture}
            onChange={prefectureChange}
            arrays={prefectures}
          />
        </div>
        <ImageInput />
        <div></div>
      </div>
      <CustomButton disabled={!userData.name} type="submit" text="更新" />
    </form>
  )
})

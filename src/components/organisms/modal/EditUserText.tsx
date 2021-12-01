import { CustomButton } from 'components/atoms/CustomButton'
import { CustomInput } from 'components/atoms/CustomInput'
import { CustomLabel } from 'components/atoms/CustomLabel'
import { CustomSelector } from 'components/atoms/CustomSelector'
import { ImageInput } from 'components/molecules/ImageInput'
import { prefectures } from 'data/prefecture'
import { useAuth } from 'hooks/useAuth'
import { useUsers } from 'hooks/useUsers'
import { memo } from 'react'

export const EditUserText = memo(() => {
  const { userData, changeAuthData, prefectureChange } = useAuth()
  const { updateUser } = useUsers()
  return (
    <form onSubmit={updateUser} className="w-72 mt-2 flex flex-col">
      <CustomLabel title="Name:" />
      <CustomInput
        name="name"
        value={userData.name}
        placeholder="Name"
        onChange={changeAuthData}
      />
      <CustomLabel title="Introduction:" />
      <CustomInput
        name="introduction"
        value={userData.introduction}
        placeholder="Introduction"
        onChange={changeAuthData}
      />
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
          <CustomLabel title="Prefecture:" />
          <CustomSelector
            value={userData.prefecture}
            onChange={prefectureChange}
            arrays={prefectures}
          />
        </div>
        <div className="flex flex-row w-full justify-center">
          <ImageInput />
        </div>
      </div>
      <CustomButton disabled={!userData.name} type="submit" text="Update" />
    </form>
  )
})

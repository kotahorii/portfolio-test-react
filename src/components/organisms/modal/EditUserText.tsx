import { CustomButton } from 'components/atoms/CustomButton'
import { CustomInput } from 'components/atoms/CustomInput'
import { CustomLabel } from 'components/atoms/CustomLabel'
import { CustomSelector } from 'components/atoms/CustomSelector'
import { ImageInput } from 'components/molecules/ImageInput'
import { prefectures } from 'data/prefecture'
import { useAuth } from 'hooks/useAuth'
import { memo } from 'react'

export const EditUserText = memo(() => {
  const { userData, changeAuthData, prefectureChange } = useAuth()
  
  return (
    <form className="w-72 mt-2 flex flex-col">
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
      <CustomLabel title="Prefecture:" />
      <CustomSelector
        value={userData.prefecture}
        onChange={prefectureChange}
        arrays={prefectures}
      />
      <div className="flex flex-row w-full justify-center mb-3">
        <ImageInput />
      </div>
      <CustomButton disabled={!userData.name} type="submit" text="Update" />
    </form>
  )
})

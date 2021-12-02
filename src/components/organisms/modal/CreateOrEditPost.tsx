import { CustomButton } from 'components/atoms/button/CustomButton'
import { CustomInput } from 'components/atoms/form/CustomInput'
import { CustomLabel } from 'components/atoms/form/CustomLabel'
import { PostImageInput } from 'components/molecules/postImage/PostImageInput'
import { useApi } from 'hooks/useApi'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'

export const CreateOrEditPost = memo(() => {
  const { editedPost, changePost, submitPost } = useMain()
  const {
    address,
    changeAddress,
    setAddressData,
    isNotValidData,
    validatedAddress,
    isLoadingAddress,
    isRefetchingAddress,
  } = useApi()
  return (
    <>
      <form onSubmit={submitPost} className="px-2">
        <div className=" grid md:grid-cols-2 mt-2 md:space-x-2">
          <div className="flex flex-col space-y-2">
            <CustomLabel title="タイトル" />
            <CustomInput
              name="title"
              value={editedPost.title}
              placeholder="タイトルを入力"
              onChange={changePost}
            />
            <CustomLabel title="本文" />
            <CustomInput
              name="body"
              value={editedPost.body}
              placeholder="本文を入力"
              onChange={changePost}
            />
            <CustomLabel title="郵便番号" />
            <div className="flex flex-row items-start space-x-2">
              <CustomInput
                name="address"
                value={address}
                onChange={changeAddress}
                placeholder="郵便番号"
              />
              <div className="">
                <CustomButton
                  text="set"
                  disabled={isNotValidData(validatedAddress)}
                  loading={isLoadingAddress || isRefetchingAddress}
                  onClick={setAddressData}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <CustomLabel title="都道府県" />
            <CustomInput
              name="prefecture"
              value={editedPost.prefecture}
              placeholder="例：広島県"
              onChange={changePost}
            />
            <CustomLabel title="市、区" />
            <CustomInput
              name="city"
              value={editedPost.city}
              placeholder="例：東広島市"
              onChange={changePost}
            />
            <CustomLabel title="町" />
            <CustomInput
              name="town"
              value={editedPost.town}
              placeholder="例：西条岡町"
              onChange={changePost}
            />
          </div>
        </div>
        <div className="w-full h-64 flex flex-col space-y-3 mt-3 items-center">
          <PostImageInput />
          <CustomButton
            disabled={!editedPost.title}
            type="submit"
            text="投稿"
          />
        </div>
      </form>
    </>
  )
})

import { CustomButton } from 'components/atoms/button/CustomButton'
import { CustomInput } from 'components/atoms/form/CustomInput'
import { CustomLabel } from 'components/atoms/form/CustomLabel'
import { PostImageInput } from 'components/molecules/postImage/PostImageInput'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'

export const CreateOrEditPost = memo(() => {
  const { editedPost, changePost, submitPost } = useMain()
  return (
    <>
      <form
        onSubmit={submitPost}
        className=" w-80 mt-2 flex flex-col space-y-3"
      >
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
        <div className="w-full flex flex-col items-center">
          <PostImageInput />
        </div>
        <CustomButton
          disabled={!editedPost.title}
          type="submit"
          text="投稿"
        />
      </form>
    </>
  )
})

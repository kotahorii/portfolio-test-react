import { CustomButton } from 'components/atoms/CustomButton'
import { CustomInput } from 'components/atoms/CustomInput'
import { CustomLabel } from 'components/atoms/CustomLabel'
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
        <CustomLabel title="Title:" />
        <CustomInput
          name="title"
          value={editedPost.title}
          placeholder="Name"
          onChange={changePost}
        />
        <CustomLabel title="Body:" />
        <CustomInput
          name="body"
          value={editedPost.body}
          placeholder="Body"
          onChange={changePost}
        />
        <CustomLabel title="Prefecture:" />
        <CustomInput
          name="prefecture"
          value={editedPost.prefecture}
          placeholder="Prefecture"
          onChange={changePost}
        />
        <CustomLabel title="City:" />
        <CustomInput
          name="city"
          value={editedPost.city}
          placeholder="City"
          onChange={changePost}
        />
        <CustomLabel title="Town:" />
        <CustomInput
          name="town"
          value={editedPost.town}
          placeholder="Town"
          onChange={changePost}
        />
        <div className="w-full flex flex-col items-center">
          <PostImageInput />
        </div>
        <CustomButton
          disabled={!editedPost.title}
          type="submit"
          text="Create"
        />
      </form>
    </>
  )
})

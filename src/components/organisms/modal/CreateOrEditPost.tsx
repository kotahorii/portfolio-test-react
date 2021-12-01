import { CustomButton } from 'components/atoms/CustomButton'
import { CustomInput } from 'components/atoms/CustomInput'
import { CustomLabel } from 'components/atoms/CustomLabel'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'

export const CreateOrEditPost = memo(() => {
  const { editedPost, changePost, submitPost } = useMain()
  return (
    <>
      <form onSubmit={submitPost} className="w-72 mt-2 flex flex-col">
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
        <CustomButton
          disabled={!editedPost.title}
          type="submit"
          text="Create"
        />
      </form>
    </>
  )
})

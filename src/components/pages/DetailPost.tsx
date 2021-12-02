import { StarIcon } from '@heroicons/react/solid'
import { CustomButton } from 'components/atoms/button/CustomButton'
import { LikeButton } from 'components/atoms/button/LikeButton'
import { CustomInput } from 'components/atoms/form/CustomInput'
import { CommentCard } from 'components/organisms/card/CommentCard'
import { LoadingHotelCard } from 'components/organisms/card/LoadingHotelCard'
import { Layout } from 'components/templates/Layout'
import { useQueryDetailPost } from 'hooks/queries/useQueryDetailPost'
import { useDetailPost } from 'hooks/useDetailPost'
import { useLikes } from 'hooks/useLikes'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { LoadingPostPage } from './LoadingPostPage'

export const DetailPost = memo(() => {
  const { isLoadingUser } = useMain()
  const {
    id,
    commentChange,
    comment,
    isLoadingComment,
    detailPost,
    isLoadingDetailPost,
    submitComment,
    postsComments,
  } = useDetailPost()

  const { postsFavorites } = useLikes()

  if (isLoadingDetailPost || isLoadingUser || isLoadingComment)
    return (
      <Layout>
        <LoadingPostPage />
      </Layout>
    )
  return (
    <Layout>
      <div className="flex flex-col space-y-2 items-center px-2 w-full min-h-screen">
        <p className="w-full text-3xl text-center font-semibold">
          {detailPost?.title}
        </p>
        <div className="flex md:flex-row flex-col justify-center items-center md:space-x-3 md:space-y-0 space-y-3 w-full">
          <div className="flex flex-col justify-between space-y-8 ">
            {detailPost?.image.url === null ? (
              <div className="w-96 h-64 rounded-lg bg-green-200"></div>
            ) : (
              <div className="w-96 h-64">
                <img
                  className="rounded-lg object-cover w-full h-full"
                  alt="post detail"
                  src={detailPost?.image.url}
                />
              </div>
            )}
            <div className="flex flex-row justify-between">
              <div className="h-7 w-12 flex flex-row items-center rounded-lg">
                {detailPost?.city !== '' && <LikeButton post={detailPost!} />}
                <span>{postsFavorites(detailPost!)?.length}</span>
              </div>
              <div className=" flex flex-row items-center space-x-1 h-7 w-14 rounded-lg">
                <StarIcon className="w-6 text-yellow-500" />
                <p>4.8</p>
              </div>
              <div className="flex flex-row truncate overflow-ellipsis h-7 w-64 rounded-lg items-center">
                {detailPost?.prefecture}
                <span className="mx-1">{detailPost?.city}</span>
                {detailPost?.town}
              </div>
            </div>
          </div>
          <form
            onSubmit={submitComment}
            className=" w-96 h-80 flex flex-col space-y-2 rounded-lg"
          >
            <div className="w-full h-72 p-2 space-y-3 overflow-auto bg-green-200 rounded-lg">
              {postsComments(Number(id))?.map((comment) => (
                <CommentCard comment={comment} />
              ))}
            </div>
            <CustomInput
              name="comment"
              value={comment}
              placeholder="コメント"
              onChange={commentChange}
            />
            <div className="w-full flex flex-row items-center space-x-2 h-10">
              <div className=" w-44"></div>
              <div className="w-32 h-8 rounded-lg bg-green-200"></div>
              <p>{comment.length}/140</p>
              <div className="w-24">
                <CustomButton
                  text="コメント"
                  type="submit"
                  disabled={comment.length === 0 || comment.length > 140}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-2 md:space-y-0 space-y-3 md:w-full w-96 pt-5 rounded-lg">
          <ul className="flex flex-col overflow-auto space-y-2 w-full h-96 bg-green-200 rounded-lg p-2">
            {[...Array(4)]
              .map((_, i) => i)
              ?.map((i) => (
                <LoadingHotelCard key={i} />
              ))}
          </ul>
          <ul className="flex flex-col overflow-auto space-y-2 w-full h-96 bg-green-200 rounded-lg p-2">
            {[...Array(4)]
              .map((_, i) => i)
              ?.map((i) => (
                <LoadingHotelCard key={i} />
              ))}
          </ul>
        </div>
        <div className="w-full md:h-96 h-56 bg-green-200 rounded-lg"></div>
      </div>
    </Layout>
  )
})

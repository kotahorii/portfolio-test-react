import { Layout } from 'components/templates/Layout'
import { useQueryDetailPost } from 'hooks/queries/useQueryDetailPost'
import { useComments } from 'hooks/useComment'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'

export const DetailPost = memo(() => {
  const { isLoadingUser } = useMain()
  const { id } = useComments()
  const { data: detailPost, isLoading: isLoadingDetailPost } =
    useQueryDetailPost(Number(id))

  if (isLoadingDetailPost || isLoadingUser) return <div></div>
  return (
    <Layout>
      <div className="flex flex-col space-y-5 items-center px-2 md:w-2/3 w-full md:mx-auto min-h-screen">
        <p className="w-full text-3xl font-semibold">{detailPost?.title}</p>
        {detailPost?.image.url === null ? null : (
          <div className="relative max-w-screen-md md:w-160 w-96 md:h-116 h-64 bg-gray-200">
            <img
              className="rounded-lg object-cover w-full h-full"
              alt="post detail"
              src={detailPost?.image.url}
            />
          </div>
        )}
      </div>
    </Layout>
  )
})

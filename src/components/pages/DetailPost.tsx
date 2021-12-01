import { Layout } from 'components/templates/Layout'
import { useQueryDetailPost } from 'hooks/queries/useQueryDetailPost'
import { useDetailPost } from 'hooks/useDetailPost'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { LoadingPostPage } from './LoadingPostPage'

export const DetailPost = memo(() => {
  const { isLoadingUser } = useMain()
  const { id } = useDetailPost()
  const { data: detailPost, isLoading: isLoadingDetailPost } =
    useQueryDetailPost(Number(id))

  if (isLoadingDetailPost || isLoadingUser)
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
              <div className="h-7 w-10 rounded-lg bg-green-200"></div>
              <div className="h-7 w-14 rounded-lg bg-green-200"></div>
              <div className="h-7 w-64 rounded-lg bg-green-200"></div>
            </div>
          </div>
          <div className=" w-96 h-80 flex flex-col space-y-2 rounded-lg">
            <div className="w-full h-72 p-2 space-y-3 overflow-auto bg-green-200 rounded-lg">
              <div className="w-full h-36 rounded-lg bg-gray-50"></div>
            </div>
            <div className="h-10 w-full bg-green-200 rounded-lg"></div>
            <div className="w-full flex flex-row space-x-2 h-10">
              <div className=" w-44"></div>
              <div className="w-32 rounded-lg bg-green-200"></div>
              <div className="w-16 rounded-full bg-green-200"></div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-2 md:space-y-0 space-y-3 md:w-full w-96 pt-5 rounded-lg">
          <ul className="flex flex-col overflow-auto space-y-2 w-full h-96 bg-green-200 rounded-lg p-2"></ul>
          <ul className="flex flex-col overflow-auto space-y-2 w-full h-96 bg-green-200 rounded-lg p-2"></ul>
        </div>
        <div className="w-full md:h-96 h-56 bg-green-200 rounded-lg"></div>
      </div>
    </Layout>
  )
})

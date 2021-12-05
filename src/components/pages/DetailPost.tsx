import { StarIcon } from '@heroicons/react/solid'
import { CustomButton } from 'components/atoms/button/CustomButton'
import { LikeButton } from 'components/atoms/button/LikeButton'
import { ShopSearchButton } from 'components/atoms/button/ShopSearchButton'
import { CustomInput } from 'components/atoms/form/CustomInput'
import { CommentCard } from 'components/organisms/card/CommentCard'
import { CustomModal } from 'components/organisms/modal/CustomModal'
import { Layout } from 'components/templates/Layout'
import { useApi } from 'hooks/useApi'
import { useDetailPost } from 'hooks/useDetailPost'
import { useLikes } from 'hooks/useLikes'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { LoadingPostPage } from './LoadingPostPage'
import { ShopModal } from 'components/organisms/modal/ShopModal'
import { HotelModal } from 'components/organisms/modal/HotelModal'
import { CustomRateInput } from 'components/molecules/rate/CustomRateInput'
import { useRates } from 'hooks/useRate'
import { Disclosure } from '@headlessui/react'
import { DisclosureText } from 'components/molecules/DisclosureText'
import { useSearch } from 'hooks/useSearch'
import { CustomTag } from 'components/atoms/button/CustomTag'
import { PaperAirplaneIcon } from '@heroicons/react/solid'
// import { GoogleMapComponent } from 'components/organisms/map/GoogleMapComponent'

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
  const {
    isOpenShopModal,
    closeShopModal,
    openShopModal,
    isOpenHotelModal,
    openHotelModal,
    closeHotelModal,
  } = useApi()

  const { postsFavorites } = useLikes()
  const { isLoadingRates, averageRate, postsRates } = useRates()
  const { isLoadingLabels, labelName, changeLabel, createLabel, postsLabels } =
    useSearch()

  if (
    isLoadingDetailPost ||
    isLoadingUser ||
    isLoadingComment ||
    isLoadingRates ||
    isLoadingLabels
  )
    return (
      <Layout>
        <LoadingPostPage />
      </Layout>
    )
  return (
    <Layout>
      <Disclosure>
        <div className="flex flex-col space-y-2 items-center px-2 w-full min-h-screen">
          <p className="w-full text-3xl text-center font-semibold">
            {detailPost?.title}
          </p>
          <div className="flex md:flex-row flex-col justify-center items-center md:space-x-3 md:space-y-0 space-y-3 w-full">
            <div className="flex flex-col justify-between space-y-4 ">
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
                <div className=" flex flex-row items-center space-x-1 h-7 w-24 rounded-lg">
                  <StarIcon className="w-6 text-yellow-500" />
                  <p className="flex flex-row">
                    {averageRate(detailPost)?.toString() !== 'NaN'
                      ? averageRate(detailPost)?.toString()
                      : 0}
                    <span className="text-gray-400 ml-0.5">
                      ({postsRates(detailPost)?.length}件)
                    </span>
                  </p>
                </div>
                <div className="flex flex-row truncate overflow-ellipsis h-7 w-64 rounded-lg items-center">
                  {detailPost?.prefecture}
                  <span className="mx-1">{detailPost?.city}</span>
                  {detailPost?.town}
                </div>
              </div>
              <ShopSearchButton
                title="周辺のレストランを検索"
                onClick={openShopModal}
              />
              <ShopSearchButton
                title="周辺のホテルを検索"
                onClick={openHotelModal}
              />
              <Disclosure.Button className="py-2 hover:bg-gray-100">
                詳細を見る
              </Disclosure.Button>
            </div>
            <form
              onSubmit={submitComment}
              className=" w-96 flex flex-col space-y-2 rounded-lg"
            >
              <div className="w-full h-80 p-2 space-y-3 overflow-auto bg-green-200 rounded-lg">
                {postsComments(Number(id))?.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
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
                <CustomRateInput />
                <p>{comment.length}/140</p>
                <div className="w-8">
                  <button
                    type="submit"
                    disabled={comment.length === 0 || comment.length > 140}
                  >
                    <PaperAirplaneIcon className=" transform rotate-90 w-6 text-gray-400 hover:text-gray-500 cursor-pointer" />
                  </button>
                </div>
              </div>
              <div className="flex flex-row space-x-1">
                <CustomInput
                  name="label"
                  value={labelName}
                  placeholder="ラベルを入力してください"
                  onChange={changeLabel}
                />
                <CustomButton
                  text="ラベル"
                  onClick={createLabel}
                  disabled={labelName.length > 15 || labelName.length === 0}
                />
              </div>
              <div className="flex flex-row space-x-2">
                {postsLabels(detailPost)?.map((label) => (
                  <CustomTag label={label} />
                ))}
              </div>
            </form>
          </div>
          <DisclosureText />
          {/* <GoogleMapComponent post={detailPost} /> */}
        </div>
        <CustomModal
          width="w-full"
          mdWidth="md:w-192"
          title="レストラン"
          isOpen={isOpenShopModal}
          closeModal={closeShopModal}
        >
          <ShopModal />
        </CustomModal>
        <CustomModal
          width="w-full"
          mdWidth="md:w-192"
          title="ホテル"
          isOpen={isOpenHotelModal}
          closeModal={closeHotelModal}
        >
          <HotelModal />
        </CustomModal>
      </Disclosure>
    </Layout>
  )
})

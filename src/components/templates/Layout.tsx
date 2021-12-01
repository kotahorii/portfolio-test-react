import { Menu } from '@headlessui/react'
import { SuccessToast } from 'components/molecules/SuccessToast'
import { CustomMenu } from 'components/organisms/menu/CustomMenu'
import { CustomModal } from 'components/organisms/modal/CustomModal'
import { EditUserText } from 'components/organisms/modal/EditUserText'
import { useHeader } from 'hooks/useHeader'
import { VFC, ReactNode, memo, useEffect } from 'react'
import { Header } from './Header'
import { CreateOrEditPost } from 'components/organisms/modal/CreateOrEditPost'

type Props = {
  children: ReactNode
}

export const Layout: VFC<Props> = memo(({ children }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const {
    isOpenEditUserModal,
    closeEditedUserModal,
    isOpenCreatePostModal,
    closeCreatePostModal,
  } = useHeader()
  // const { isOpenDeleteBookModal, closeDeleteBookModal } = useMyPage()
  return (
    <Menu>
      <div className="flex flex-col relative items-center text-gray-500 text-sm font-mono">
        <Header />
        <main className="flex flex-1 flex-col absolute top-20 justify-start items-center py-5 w-screen">
          {children}
          <CustomMenu />
        </main>

        <CustomModal
          title="プロフィールを編集"
          isOpen={isOpenEditUserModal}
          closeModal={closeEditedUserModal}
        >
          <EditUserText />
        </CustomModal>
        <CustomModal
          title="新規投稿"
          isOpen={isOpenCreatePostModal}
          closeModal={closeCreatePostModal}
        >
          <CreateOrEditPost />
        </CustomModal>
        {/* <CustomModal
          isOpen={isOpenDeleteBookModal}
          closeModal={closeDeleteBookModal}
          title={detailBook.title}
        >
          <DeleteBookModal />
        </CustomModal> */}
        <SuccessToast />
      </div>
    </Menu>
  )
})

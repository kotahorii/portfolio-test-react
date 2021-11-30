import { Menu } from '@headlessui/react'
import { SuccessToast } from 'components/molecules/SuccessToast'
import { VFC, ReactNode, memo, useEffect } from 'react'
import { Header } from './Header'

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

  // const {
  //   isOpenEditUserModal,
  //   closeEditedUserModal,
  //   isOpenBookModal,
  //   closeCreateBookModal,
  // } = useHeader()
  // const { isOpenDeleteBookModal, closeDeleteBookModal } = useMyPage()
  return (
    <Menu>
      <div className="flex flex-col relative items-center text-gray-500 text-sm font-mono">
        <Header />
        <main className="flex flex-1 flex-col absolute top-20 justify-start items-center py-5 w-screen">
          {children}
          {/* <CustomMenu /> */}
        </main>

        {/* <CustomModal
          title="Edit user"
          isOpen={isOpenEditUserModal}
          closeModal={closeEditedUserModal}
        >
          <EditUserText />
        </CustomModal>
        <CustomModal
          title="Create Book"
          isOpen={isOpenBookModal}
          closeModal={closeCreateBookModal}
        >
          <CreateOrEditBook />
        </CustomModal>
        <CustomModal
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

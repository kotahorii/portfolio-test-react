import { Menu } from '@headlessui/react'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { CustomUserIcon } from 'components/molecules/userIcon/CustomUserIcon'

export const Header = memo(() => {
  const pageTopButton = document.querySelector('#page-top')
  pageTopButton?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
  const { currentUser } = useMain()
  return (
    <nav className=" flex flex-row z-10 fixed justify-between items-center border-b bg-gray-50 border-gray-300 px-3 w-screen h-20 text-gray-500 bg-gray-20">
      <Menu.Button>
        <CustomUserIcon user={currentUser} />
      </Menu.Button>
      <div
        id="page-top"
        className="text-3xl p-3 rounded-full hover:bg-gray-200 cursor-pointer"
      >
        Portfolio App
      </div>
      <div className="md:flex hidden flex-row space-x-3">
        <Link
          to="/main"
          className="text-lg hover:bg-gray-200 rounded-full px-3 py-3"
        >
          投稿一覧
        </Link>
        <Link
          to="/myPage"
          className="text-lg hover:bg-gray-200 rounded-full px-3 py-3"
        >
          マイページ
        </Link>
      </div>
      <div className="md:hidden block"></div>
    </nav>
  )
})

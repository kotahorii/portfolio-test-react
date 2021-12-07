import { Menu } from '@headlessui/react'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { CustomUserIcon } from 'components/molecules/userIcon/CustomUserIcon'

export const Header = memo(() => {
  const { currentUser } = useMain()
  return (
    <nav className=" flex flex-row z-10 fixed justify-between items-center bg-gray-50 shadow-md px-3 w-screen h-20 text-gray-500 bg-gray-20">
      <Menu.Button>
        <CustomUserIcon user={currentUser} />
      </Menu.Button>
      <div
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }}
        className="text-3xl p-2 hover:border-b-2 border-indigo-400 cursor-pointer"
      >
        Portfolio App
      </div>
      <div className="md:flex hidden flex-row space-x-3">
        <Link
          to="/main"
          className="text-lg hover:bg-gray-100 rounded-md px-2 py-2"
        >
          投稿一覧
        </Link>
        <Link
          to="/myPage"
          className="text-lg hover:bg-gray-100 rounded-md px-2 py-2"
        >
          マイページ
        </Link>
      </div>
      <div className="md:hidden block"></div>
    </nav>
  )
})

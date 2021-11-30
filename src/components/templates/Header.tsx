import { Menu } from '@headlessui/react'
import { CustomUserIcon } from 'components/molecules/CustomUserIcon'
import { useMain } from 'hooks/useMain'
import { memo } from 'react'
import { Link } from 'react-router-dom'

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
    <nav className=" flex flex-row z-10 fixed justify-between items-center px-3 w-screen h-20 text-white bg-green-300">
      <Menu.Button>
        <CustomUserIcon user={currentUser} width="w-12" />
      </Menu.Button>
      <div
        id="page-top"
        className="text-3xl hover:text-green-100 cursor-pointer"
      >
        Portfolio App
      </div>
      <div className="md:flex hidden flex-row space-x-3">
        <Link
          to="/main"
          className="text-lg hover:bg-green-400 rounded-full px-3 py-3"
        >
          Posts
        </Link>
        <Link
          to="/users"
          className="text-lg hover:bg-green-400 rounded-full px-3 py-3"
        >
          Users
        </Link>
      </div>
      <div className="md:hidden block"></div>
    </nav>
  )
})

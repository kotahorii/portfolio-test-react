import {
  PencilAltIcon,
  PlusSmIcon,
  UserIcon,
  UsersIcon,
  BookOpenIcon,
} from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import {
  selectIsOpenCreatePostModal,
  setIsOpenCreatePostModal,
} from 'slices/postSlice'
import {
  selectIsOpenEditUserModal,
  setIsOpenEditUserModal,
  setUserData,
} from 'slices/userSlice'
import { MenuType } from 'types/postType'
import { useQueryCurrentUser } from './queries/useQueryCurrentUser'
import { useAuth } from './useAuth'

export const useHeader = () => {
  const dispatch = useAppDispatch()
  const { data: currentUser } = useQueryCurrentUser()
  const { userData } = useAuth()
  const isOpenCreatePostModal = useAppSelector(selectIsOpenCreatePostModal)
  const isOpenEditUserModal = useAppSelector(selectIsOpenEditUserModal)
  const navigate = useNavigate()

  const openEditUserModal = useCallback(() => {
    if (currentUser) {
      dispatch(
        setUserData({
          ...userData,
          id: currentUser.id,
          name: currentUser.name,
          introduction: currentUser.introduction,
          prefecture: currentUser.prefecture,
        })
      )
      dispatch(setIsOpenEditUserModal(true))
    }
  }, [dispatch, currentUser, userData])

  const closeEditedUserModal = useCallback(() => {
    dispatch(setIsOpenEditUserModal(false))
  }, [dispatch])

  const openCreatePostModal = useCallback(() => {
    dispatch(setIsOpenCreatePostModal(true))
  }, [dispatch])

  const closeCreateBookModal = useCallback(() => {
    dispatch(setIsOpenCreatePostModal(false))
  }, [dispatch])

  const myPageNavigate = useCallback(() => {
    navigate('/myPage')
  }, [navigate])

  const menuItems: MenuType = [
    {
      name: 'Edit my profile',
      icon: PencilAltIcon,
      onClick: openEditUserModal,
    },
    {
      name: 'Create new book',
      icon: PlusSmIcon,
      onClick: openCreatePostModal,
    },
    {
      name: 'Go to my page',
      icon: UserIcon,
      onClick: myPageNavigate,
    },
  ]

  const responsiveItems: MenuType = [
    {
      name: 'Users page',
      icon: UsersIcon,
      onClick: () => navigate('/users'),
    },
    {
      name: 'Books page',
      icon: BookOpenIcon,
      onClick: () => navigate('/main'),
    },
  ]

  return {
    isOpenCreatePostModal,
    isOpenEditUserModal,
    openEditUserModal,
    closeEditedUserModal,
    openCreatePostModal,
    closeCreateBookModal,
    myPageNavigate,
    menuItems,
    responsiveItems,
  }
}

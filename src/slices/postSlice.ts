import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post, UpdatePost } from 'types/postType'
import { RootState } from '../app/store'

type StateType = {
  editedPost: UpdatePost
  detailPost: Post
  isOpenCreatePostModal: boolean
  isOpenDeletePostModal: boolean
}

const initialState: StateType = {
  editedPost: {
    id: 0,
    body: '',
    title: '',
    prefecture: '東京都',
    city: '',
    town: '',
    image: '',
  },
  detailPost: {
    title: '',
    body: '',
    prefecture: '東京都',
    city: '',
    town: '',
    genre: 0,
    userId: 0,
    image: {
      url: '',
    },
    id: 0,
    createdAt: '',
    updatedAt: '',
  },
  isOpenCreatePostModal: false,
  isOpenDeletePostModal: false,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,

  reducers: {
    setEditPost: (state, action: PayloadAction<UpdatePost>) => {
      state.editedPost = action.payload
    },
    resetEditPost: (state) => {
      state.editedPost = initialState.editedPost
    },
    setDetailPost: (state, action: PayloadAction<Post>) => {
      state.detailPost = action.payload
    },
    resetDetailPost: (state) => {
      state.detailPost = initialState.detailPost
    },
    setIsOpenCreatePostModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreatePostModal = action.payload
    },
    setIsOpenDeletePostModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenDeletePostModal = action.payload
    },
  },
})

export const {
  setEditPost,
  resetEditPost,
  setDetailPost,
  resetDetailPost,
  setIsOpenCreatePostModal,
  setIsOpenDeletePostModal,
} = postSlice.actions
export const selectEditedPost = (state: RootState) => state.post.editedPost
export const selectDetailPost = (state: RootState) => state.post.detailPost
export const selectIsOpenCreatePostModal = (state: RootState) =>
  state.post.isOpenCreatePostModal
export const selectIsOpenDeletePostModal = (state: RootState) =>
  state.post.isOpenDeletePostModal
export default postSlice.reducer

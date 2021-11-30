import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post, UpdatePost } from 'types/postType'
import { RootState } from '../app/store'

type StateType = {
  editedPost: UpdatePost
  detailPost: Post
}

const initialState: StateType = {
  editedPost: {
    id: 0,
    body: '',
    title: '',
    prefecture: '東京都',
    city: '',
    town: '',
    genre: 0,
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
  },
})

export const { setEditPost, resetEditPost, setDetailPost, resetDetailPost } =
  postSlice.actions
export const selectEditedPost = (state: RootState) => state.post.editedPost
export const selectDetailPost = (state: RootState) => state.post.detailPost
export default postSlice.reducer

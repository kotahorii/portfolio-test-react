import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UpdatePost } from 'types/postType'
import { RootState } from '../app/store'

type StateType = {
  editedPost: UpdatePost
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
}

export const postSlice = createSlice({
  name: 'post',
  initialState,

  reducers: {
    setEditPost: (state, action: PayloadAction<UpdatePost>) => {
      state.editedPost = action.payload
    },
  },
})

export const { setEditPost } = postSlice.actions
export const selectCount = (state: RootState) => state.post.editedPost
export default postSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignUpData, User } from 'types/userType'
import { RootState } from '../app/store'

type StateType = {
  userData: SignUpData & { id: number }
  detailUser: User
  preview: string
}
const initialState: StateType = {
  userData: {
    id: 0,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    introduction: '',
    prefecture: 0,
    image: '',
  },
  detailUser: {
    id: 0,
    email: '',
    name: '',
    image: {
      url: '',
    },
    introduction: '',
    prefecture: 0,
    createdAt: '',
    updatedAt: '',
  },
  preview: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUserData: (
      state,
      action: PayloadAction<SignUpData & { id: number }>
    ) => {
      state.userData = action.payload
    },
    resetUserData: (state) => {
      state.userData = initialState.userData
    },
    setDetailUser: (state, action: PayloadAction<User>) => {
      state.detailUser = action.payload
    },
    resetDetailUser: (state) => {
      state.detailUser = initialState.detailUser
    },
    setPreview: (state, action) => {
      state.preview = action.payload
    },
  },
})
export const {
  setUserData,
  resetUserData,
  setDetailUser,
  resetDetailUser,
  setPreview,
} = userSlice.actions
export const selectUserData = (state: RootState) => state.user.userData
export const selectDetailUser = (state: RootState) => state.user.detailUser
export const selectPreview = (state: RootState) => state.user.preview
export default userSlice.reducer

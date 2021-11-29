import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignUpData, User } from 'types/userType'
import { RootState } from '../app/store'

type StateType = {
  userData: SignUpData & { id: number }
  detailUser: User
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
  },
})
export const { setUserData, resetUserData, setDetailUser, resetDetailUser } =
  userSlice.actions
export const selectUserData = (state: RootState) => state.user.userData
export const selectDetailUser = (state: RootState) => state.user.detailUser
export default userSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignUpData } from 'types/userType'
import { RootState } from '../app/store'

type StateType = {
  authData: SignUpData & { id: number }
}
const initialState: StateType = {
  authData: {
    id: 0,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    introduction: '',
    prefecture: 0,
    image: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<SignUpData & { id: number }>
    ) => {
      state.authData = action.payload
    },
    resetAuthData: (state) => {
      state.authData = initialState.authData
    },
  },
})
export const { setAuthData } = userSlice.actions
export const selectAuthData = (state: RootState) => state.user.authData
export default userSlice.reducer

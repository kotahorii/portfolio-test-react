import { useAuth } from 'hooks/useAuth'
import { SwitchVerticalIcon } from '@heroicons/react/outline'
import { SuccessToast } from 'components/molecules/SuccessToast'
import { LoginForm } from 'components/organisms/auth/LoginForm'
import { SignUpForm } from 'components/organisms/auth/SignUpForm'
import { CustomButton } from 'components/atoms/CustomButton'

export const Auth = () => {
  const { isLogin, toggleIsLogin, authUser, isValidAuth, isLoadingAuth } =
    useAuth()
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen w-screen">
      <form
        onSubmit={authUser}
        className="flex md:w-96 w-96 shadow-xl bg-gray-50 rounded-xl px-7 py-5 items-center flex-col text-gray-600"
      >
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <div className="flex flex-row w-full mt-5 space-x-3 items-center justify-center">
          <div className="flex flex-row space-x-5 justify-center items-center w-full">
            <CustomButton
              disabled={isValidAuth()}
              type="submit"
              text={isLogin ? 'ログイン' : '新規登録'}
              loading={isLoadingAuth()}
            />
            <SwitchVerticalIcon
              className="w-6 text-blue-500 hover:text-blue-600 cursor-pointer"
              onClick={toggleIsLogin}
            />
          </div>
        </div>
      </form>
      <SuccessToast />
    </div>
  )
}

import { useSelector } from 'react-redux'

import { selectUser } from '@entities/User/model/slice/userSlice'

export const AuthPage = () => {
  /*   const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { register } = useAuth()
  const { resetPassword } = useAuth()
  const { reset } = useAuth()
  const { user, error: authError, loading: authLoading } = useAuth()
  const { data, error: resetError, loading: resetLoading } = useResetPassword()
  const { data: userData, error: registerError, loading: registerLoading } = useRegister()
  const { data: loginData, error: loginError, loading: loginLoading } = useLogin()
 */
  const user = useSelector(selectUser)
  console.log(user)

  return (
    <div
      className="auth-page"
      style={{
        textAlign: 'center',
        padding: '150px',
      }}>
      <div className="auth-page__container">
        <div className="auth-page__header">
          <h1>Auth Page</h1>
        </div>
      </div>
    </div>
  )
}

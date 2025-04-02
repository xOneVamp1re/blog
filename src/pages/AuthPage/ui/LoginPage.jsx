import { useSelector } from 'react-redux'

import { selectUser } from '@entities/User/model/slice/userSlice'

export const AuthPage = () => {
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

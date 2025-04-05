import { ProfileDropdown } from '@features/userProfile/ProfileDropdown'
import { Logout } from '@features/auth/logout'
import { LinkButton } from '@shared/ui/button/LinkButton'

export const HeaderWithAuth = () => {
  return (
    <>
      <LinkButton action="create" buttonText="Create article" to="/createArticle" />
      <ProfileDropdown />
      <Logout />
    </>
  )
}

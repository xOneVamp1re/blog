import { Outlet } from 'react-router'

import { Header } from '@widgets/Header'

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

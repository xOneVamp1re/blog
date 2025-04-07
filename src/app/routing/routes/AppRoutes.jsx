import { useMemo } from 'react'
import { useRoutes } from 'react-router'

// import { AnimatePresence, motion } from 'framer-motion'
import { LoginPage } from '@pages/LoginPage'
import { HomePage } from '@pages/HomePage'
import { SignUpPage } from '@pages/SignUpPage'
import { NoMatchPage } from '@pages/NoMatchPage'
import { UserProfilePage } from '@pages/UserProfilePage'
import { UserProfileEditPage } from '@pages/UserProfileEditPage'
import { ArticlePage } from '@pages/ArticlePage'
import { Layout } from '@app/routing'

import { PrivateRoute } from './PrivateRoute'
import { AuthRoute } from './AuthRoute'

const protectedRoutes = [
  { path: '/profile', element: <UserProfilePage /> },
  { path: '/editProfile', element: <UserProfileEditPage /> },
  { path: '/articles', element: <HomePage /> },
  { path: '/article/:slug', element: <ArticlePage /> },
]

const createAuthRoutes = () => [
  {
    path: '/login',
    element: (
      <AuthRoute>
        <LoginPage />
      </AuthRoute>
    ),
  },
  {
    path: '/signUp',
    element: (
      <AuthRoute>
        <SignUpPage />
      </AuthRoute>
    ),
  },
]
const createProtectedRoutes = (routes) => {
  return routes.map((route) => ({
    ...route,
    element: <PrivateRoute>{route.element}</PrivateRoute>,
  }))
}

export const AppRoutes = () => {
  const routes = useMemo(
    () => [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          ...createAuthRoutes(),
          ...createProtectedRoutes(protectedRoutes),
          { path: '*', element: <NoMatchPage /> },
        ],
      },
    ],
    []
  )

  return useRoutes(routes)
}

/* const pageVariants = {
  initial: { opacity: 0, x: 0 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 0 },
}

const AnimatedPage = ({ children }) => (
  <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={{ duration: 0.2 }}>
    {children}
  </motion.div>
) */
/*   return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        <AnimatedPage>{routes}</AnimatedPage>
      </motion.div>
    </AnimatePresence>
  ) */

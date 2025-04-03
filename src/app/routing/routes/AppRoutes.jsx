import { useRoutes, Link } from 'react-router'
import { useSelector } from 'react-redux'

// import { AnimatePresence, motion } from 'framer-motion'
import { LoginPage } from '@pages/LoginPage'
import { HomePage } from '@pages/HomePage'
import { SignUpPage } from '@pages/SignUpPage'
import { NoMatchPage } from '@pages/NoMatchPage'
import { Layout } from '@app/routing'

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

export const AppRoutes = () => {
  // const location = useLocation()
  // console.log(location)

  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/signUp',
          element: <SignUpPage />,
        },
        /*  {
          path: 'protected',
          element: <ProtectedRoutes />,
          children: [
            { path: 'dashboard', element: <DashboardPage /> },
            // другие защищенные маршруты
          ],
        }, */
        { path: '*', element: <NoMatchPage /> },
      ],
    },
  ])

  return routes
}

/* 
 const navRoutes = [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/login',
      element: <AuthPage />,
    },
    {
      path: '/signUp',
      element: <SignUpPage />,
    },
    {
      path: '*',
      element: <NoMatchPage />,
    },
  ]
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {navRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
*/

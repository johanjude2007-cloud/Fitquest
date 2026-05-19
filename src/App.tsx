import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet, createHashHistory } from '@tanstack/react-router'
import { useAuth } from './hooks/useAuth'
import { SharedAppLayout } from './layouts/shared-app-layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Workouts from './pages/Workouts'
import RunTracker from './pages/RunTracker'
import Community from './pages/Community'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'

const rootRoute = createRootRoute({
  component: () => (
    <div className="flex w-full flex-1 flex-col min-h-0">
      <Outlet />
    </div>
  ),
})

function AuthenticatedLayout() {
  const { user, isLoading } = useAuth()
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }
  if (!user) return <Login />
  return (
    <SharedAppLayout appName="FitQuest">
      <Outlet />
    </SharedAppLayout>
  )
}

const authRoute = createRoute({ getParentRoute: () => rootRoute, id: 'auth', component: AuthenticatedLayout })
const indexRoute = createRoute({ getParentRoute: () => authRoute, path: '/', component: Dashboard })
const workoutsRoute = createRoute({ getParentRoute: () => authRoute, path: '/workouts', component: Workouts })
const runRoute = createRoute({ getParentRoute: () => authRoute, path: '/run', component: RunTracker })
const communityRoute = createRoute({ getParentRoute: () => authRoute, path: '/community', component: Community })
const leaderboardRoute = createRoute({ getParentRoute: () => authRoute, path: '/leaderboard', component: Leaderboard })
const profileRoute = createRoute({ getParentRoute: () => authRoute, path: '/profile', component: Profile })

const routeTree = rootRoute.addChildren([authRoute.addChildren([indexRoute, workoutsRoute, runRoute, communityRoute, leaderboardRoute, profileRoute])])
const router = createRouter({ routeTree, history: createHashHistory() })

declare module '@tanstack/react-router' { interface Register { router: typeof router } }

export default function App() { return <RouterProvider router={router} /> }

import { Route, BrowserRouter, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import DashboardLayout from './layout/DashboardLayout'
import Home from './pages/Home'
import About from './pages/About'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'
import Planner from './pages/Planner'
import Saved from './pages/Saved'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import RequireAuth from './components/RequireAuth'
import { AuthProvider } from './auth/AuthContext'
import { KitchenProvider } from './kitchen/KitchenContext'
import { ROUTES } from './constants/navigation'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <KitchenProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.ABOUT} element={<About />} />
              <Route path={ROUTES.RECIPES} element={<Recipes />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.RECIPE_DETAIL} element={<RecipeDetail />} />
            </Route>
            <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.PLAN} element={<Planner />} />
              <Route path={ROUTES.SAVED} element={<Saved />} />
            </Route>
          </Routes>
        </KitchenProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

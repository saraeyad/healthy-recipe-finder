import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
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
          <MainLayout>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.ABOUT} element={<About />} />
              <Route path={ROUTES.RECIPES} element={<Recipes />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.RECIPE_DETAIL} element={<RecipeDetail />} />
              <Route path={ROUTES.DASHBOARD} element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path={ROUTES.PLAN} element={<RequireAuth><Planner /></RequireAuth>} />
              <Route path={ROUTES.SAVED} element={<RequireAuth><Saved /></RequireAuth>} />
            </Routes>
          </MainLayout>
        </KitchenProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'
import Planner from './pages/Planner'
import Saved from './pages/Saved'
import { KitchenProvider } from './kitchen/KitchenContext'
import { ROUTES } from './constants/navigation'

function App() {
  return (
    <BrowserRouter>
      <KitchenProvider>
        <MainLayout>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.RECIPES} element={<Recipes />} />
            <Route path={ROUTES.PLAN} element={<Planner />} />
            <Route path={ROUTES.SAVED} element={<Saved />} />
            <Route path={ROUTES.RECIPE_DETAIL} element={<RecipeDetail />} />
          </Routes>
        </MainLayout>
      </KitchenProvider>
    </BrowserRouter>
  )
}

export default App


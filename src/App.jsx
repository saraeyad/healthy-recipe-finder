import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'
import { ROUTES } from './constants/navigation'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.RECIPES} element={<Recipes />} />
          <Route path={ROUTES.RECIPE_DETAIL} element={<RecipeDetail />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App


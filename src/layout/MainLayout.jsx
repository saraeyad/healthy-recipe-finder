import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import PageTransition from '../components/PageTransition'

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <Header />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout

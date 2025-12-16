import Header from './Header'
import Footer from './Footer'
import PageTransition from '../components/PageTransition'

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout


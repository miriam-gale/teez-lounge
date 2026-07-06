import Navbar from './Navbar'
import Footer from './Footer'
import FloatingActions from './FloatingActions'

/**
 * Shared shell: Navbar + page content + Footer + floating actions.
 */
export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  )
}

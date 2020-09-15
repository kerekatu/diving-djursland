import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const router = useRouter()
  const headerCondition = () => {
    if (
      router.pathname === '/' ||
      router.pathname === '/da' ||
      router.pathname === '/de' ||
      router.pathname === '/en'
    ) {
      return true
    }
  }

  return (
    <>
      <Header isExtended={headerCondition() && true} />
      <main className={headerCondition() ? 'home' : 'main-content'}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout

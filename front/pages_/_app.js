import '@/styles/globals.scss'
import '@/styles/grid.scss'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
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
    <div className={headerCondition() ? 'app_home' : 'app'}>
      <Component {...pageProps} />
    </div>
  )
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.any
}

export default MyApp

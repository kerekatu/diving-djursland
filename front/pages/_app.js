import '@/styles/globals.scss'
import '@/styles/grid.scss'
import PropTypes from 'prop-types'
import { appWithTranslation } from '../i18n'
import { useRouter } from 'next/router'

import Header from '@/components/Header/Header'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  console.log(router)
  const headerCondition = router.pathname === '/'
  const tripsCondition = Component?.name === 'TripsPage'

  return (
    <div className={headerCondition ? 'app_home' : 'app'}>
      <Header isExtended={headerCondition && true} />
      <main className={headerCondition ? 'home' : 'main-content'}>
        <Component {...pageProps} />
      </main>
    </div>
  )
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.any
}

export default appWithTranslation(MyApp)

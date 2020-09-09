import '@/styles/globals.scss'
import '@/styles/grid.scss'
import Header from '@/components/Header/Header'
import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }) {
  const headerCondition = Component?.name === 'HomePage'

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <div className={headerCondition ? 'app_home' : 'app'}>
        <Header isExtended={headerCondition && true} />
        <main className={headerCondition ? 'home' : 'main-content'}>
          <Component {...pageProps} />
        </main>
      </div>
    </SWRConfig>
  )
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.any,
}

export default MyApp

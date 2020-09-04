import '@/styles/globals.scss'
import Header from '@/components/Header/Header'
import PropTypes from 'prop-types'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }) {
  const headerCondition = Component?.name === 'Home'

  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (...args) => fetch(...args).then((res) => res.json())
      }}
    >
      <div className={headerCondition ? 'app_home' : 'app'}>
        <Header isExtended={headerCondition && true} />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  )
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.any
}

export default MyApp

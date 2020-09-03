import '../styles/globals.scss'
import Header from '../components/Header/Header'
import PropTypes from 'prop-types'

function MyApp({ Component, pageProps }) {
  if (Component?.name === 'Home') {
    return (
      <div className="app_home">
        <Header type="extended" />
        <Component {...pageProps} />
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.any
}

export default MyApp

import PropTypes from 'prop-types'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const Layout = ({ children, extendedHeader = false }) => {
  if (extendedHeader) {
    return (
      <>
        <Header isExtended={extendedHeader} />
        <main className="home">{children}</main>
        <Footer isExtended={extendedHeader} />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  extendedHeader: PropTypes.bool,
}

export default Layout

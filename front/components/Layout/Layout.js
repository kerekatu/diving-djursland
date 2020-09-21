import PropTypes from 'prop-types'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const Layout = ({
  children,
  extendedHeader = false,
  containedWidth = true
}) => {
  if (extendedHeader) {
    return (
      <>
        <Header isExtended={extendedHeader} containedWidth={containedWidth} />
        <main className="home">{children}</main>
        <Footer isExtended={extendedHeader} />
      </>
    )
  }

  return (
    <>
      <Header containedWidth={containedWidth} />
      <main
        className={containedWidth ? 'main_content_contained' : 'main_content'}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  extendedHeader: PropTypes.bool,
  containedWidth: PropTypes.bool
}

export default Layout

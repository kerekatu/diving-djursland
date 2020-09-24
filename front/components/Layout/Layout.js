import PropTypes from 'prop-types'

import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const Layout = ({
  children,
  extendedHeader = false,
  extendedFooter = false,
  containedWidth = true,
  variantWhite = false
}) => {
  if (extendedHeader) {
    return (
      <>
        <Header
          isExtended={extendedHeader}
          containedWidth={containedWidth}
          variant={variantWhite}
        />
        <main className="home">{children}</main>
        <Footer isExtended={extendedHeader} />
      </>
    )
  }

  return (
    <>
      <Header containedWidth={containedWidth} variant={variantWhite} />
      <main
        className={containedWidth ? 'main_content_contained' : 'main_content'}
      >
        {children}
      </main>
      <Footer isExtended={extendedFooter} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  extendedHeader: PropTypes.bool,
  extendedFooter: PropTypes.bool,
  containedWidth: PropTypes.bool,
  variantWhite: PropTypes.bool
}

export default Layout

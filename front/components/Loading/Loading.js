import PropTypes from 'prop-types'

const Loading = ({ title = 'Loading...' }) => {
  return <h3 className="center_full">{title}</h3>
}

Loading.propTypes = {
  title: PropTypes.string
}

export default Loading

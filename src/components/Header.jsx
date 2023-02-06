import PropTypes from 'prop-types'

function Header({ text='Feedback UI' }) {
  return (
    <header>
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  )
}

Header.propTypes = {
  text: PropTypes.string
}

export default Header
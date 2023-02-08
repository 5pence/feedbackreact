import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Header({ text='Feedback UI' }) {
  return (
    <header>
      <div className="container">
        <Link to='/'>
          <h2>{text}</h2>
        </Link>
      </div>
    </header>
  )
}

Header.propTypes = {
  text: PropTypes.string
}

export default Header
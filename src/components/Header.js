import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <Link to='/news'> <img className='header-icon' src='https://image.flaticon.com/icons/svg/1074/1074055.svg' /> </Link>
      </div>


      <div className='header-container'>
        <Link to='/coins'> <img className='header-icon' src='https://image.flaticon.com/icons/svg/2422/2422787.svg' /> </Link>
      </div>
    </header>
  )
}

export default Header
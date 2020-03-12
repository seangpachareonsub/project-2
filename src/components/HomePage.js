import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <main>

      <div className='homepage-container'>
        <Link to='/news'> <img className='news-icon' src='https://image.flaticon.com/icons/svg/1074/1074055.svg' /> </Link>
        News
      </div>


      <div className='homepage-container'>
        <Link to='/coins'> <img className='market-icon' src='https://image.flaticon.com/icons/svg/2422/2422787.svg' /> </Link>
        Market Data
      </div>

    </main>

  )
}

export default HomePage
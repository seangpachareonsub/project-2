import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class Header extends React.Component {

  constructor() {
    super()
    this.state = {
      time: ''
    }

  }

  componentDidMount() {
    setInterval(() => {
      const newTime = moment().format('MMMM Do YYYY, h:mm:ss a')
      this.setState({ time: newTime })
    }, 1000)
  }


  render() {
    return (

      <nav>

        <div className='logo'>
          <img id='logo' src="https://i.imgur.com/I6msInQ.png" alt=""/>
          <h1> Financier </h1>
        </div>

        <div className='header-links'>
          <Link to='/'> <li> World News </li> </Link>
          <Link to='/coins'> <li> Crypto Data </li> </Link>

          <div id='time-contain'>
            <p id='time'>{this.state.time}</p>
          </div>

        </div>

      </nav>

    )
  }
}

export default Header
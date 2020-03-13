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
     
      <header className='header'>


        <div className='header-container'>
          <Link to='/news'> <li> News </li> </Link>
        </div>

        <div className='header-container'>
          <Link to='/coins'> <li> Market Data </li> </Link>
        </div>

        <div id='time-contain' className='header-container'>
          <p id='time'>{this.state.time}</p> 
        </div>
    
        
      </header>



    )
  }
}

export default Header
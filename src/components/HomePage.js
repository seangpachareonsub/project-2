import React from 'react'
import { Link } from 'react-router-dom'



const HomePage = () => {  

  return (
    <main>
      
      {/* <img id='cover-image' src='https://media0.giphy.com/media/U4FkC2VqpeNRHjTDQ5/giphy.gif?cid=ecf05e4772191dda4a13943c68d9c19473145da69abaf3f5&rid=giphy.gif' /> */}


      <div className='homepage-container'>
        <Link to='/news'> <button>CRYPTOGRAPHY AT YOUR FINGERTIPS</button></Link>
      </div>


    </main>

  )
}

export default HomePage
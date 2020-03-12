import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bulma'
import './styles/style.scss'
// import axios from 'axios'


import CoinsList from './components/CoinsList'
import SingleCoin from './components/SingleCoin'
import HomePage from './components/HomePage'
import NewsPage from './components/NewsPage'


const App = () => (

  <Router>


    <Switch>

      <Route exact path='/' component={HomePage} />
      <Route exact path='/news' component={NewsPage} />

      <Route exact path='/coins' component={CoinsList} />
      {/* <Route exact path='/coins/:id' component={SingleCoin} /> */}


    </Switch>
  </Router>
)











ReactDOM.render(
  <App />,
  document.getElementById('root')
)


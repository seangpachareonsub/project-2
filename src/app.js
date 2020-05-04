import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/style.scss'

import CoinsList from './components/CoinsList'
import NewsPage from './components/NewsPage'

const App = () => (

  <Router basename='/financier'>
    <Switch>
      <Route exact path='/' component={NewsPage} />
      <Route exact path='/coins' component={CoinsList} /> 
    </Switch>
  </Router>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


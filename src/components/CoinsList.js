import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SingleCoin from './SingleCoin'
import Header from './Header'

import TradingViewWidget from 'react-tradingview-widget'




class HomePage extends React.Component {

  constructor() {
    super()
    this.state = {
      exchanges: [],
      headings: ['Market Cap Rank', 'Name', 'Market Cap', 'Price', 'Total Volume', 'Circulating Supply', 'Market Cap Change (24h)'],
      modalActive: false,
      singleCoin: {
        description: {}
      },
      base: 'USD'
    }
  }

  componentDidMount() {

    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(response => {
        this.setState({ exchanges: response.data })
        // console.log(response.data)
      })
  }

  change(event) {
    const symbol = event.target.value.toUpperCase()

    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${event.target.value}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(response => {
        this.setState({ exchanges: response.data, base: symbol })
      })
  }

  handleClick(crypto) {
    // this.setState({ singleCoinName: crypto })
    // this.toggleModal()
    axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.id.toLowerCase()}`)
      .then(response => {
        // this.setState({ data: response.data, description: response.data.description })
        this.setState({ singleCoin: response.data })
        this.toggleModal()
      })
  }

  handleSort(a, b) {
    // const sort = Array.from(this.state.exchanges.name).sort()
    const idA = a.id.toUpperCase()
    const idB = b.id.toUpperCase()
    const filter = document.getElementsByClassName('namefilter')[0]
    let comparison = 0

    if (filter.value === 'a-z') {
      if (idA > idB) {
        comparison = 1
      } else if (idA < idB) {
        comparison = -1
      }
      return comparison
    } else {
      if (idA < idB) {
        comparison = 1
      } else if (idA > idB) {
        comparison = -1
      }
      return comparison
    }
  }





  toggleModal() {
    const newModal = !this.state.modalActive
    this.setState({ modalActive: newModal })
  }

  render() {
    // console.log(this.state.exchanges)
    // console.log(this.state.singleCoin)

    return (

      <>

        <Header />

        <div className="filters">
          <select onChange={(event) => this.change(event)} id="base">
            <option value="usd">USD</option>
            <option value="btc">BTC</option>
            <option value="eth">ETH</option>
            <option value="xrp">XRP</option>
            <option value="bch">BCH</option>
            <option value="ltc">LTC</option>
          </select>

        </div>

        <div className="headers">
          {this.state.headings.map((headers, i) => {
            return (
              <div key={i} className='data-headings'>
                <h1 > {headers} </h1>
                {headers === 'Name' ? <select className='namefilter' 
                  onChange={() => this.setState({ exchanges: this.state.exchanges.sort(this.handleSort) })}>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select> : null}
              </div>

            )
          })}

        </div>



        <div key={crypto.id} className="table">

          {this.state.exchanges.map((crypto, i) => {
            if (i < 50) {

             

              return (

                <div className="container" onClick={() => this.handleClick(crypto)}>


                  <div className="data">
                    <h1> {crypto.market_cap_rank} </h1>
                  </div>


                  <div value={crypto.name} className="data">
                    <img src={crypto.image} />
                    <h1 id='name' style={{ color: '#d49677' }}> {crypto.name} </h1>
                  </div>


                  <div className="data">
                    <p> {crypto.market_cap.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + ' ' + this.state.base} </p>
                  </div>

                  <div className="data">
                    <p> {crypto.current_price.toFixed(2).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + ' ' + this.state.base} </p>
                  </div>

                  <div className="data">
                    <p> {crypto.total_volume.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + ' ' + this.state.base} </p>
                  </div>

                  <div className="data">
                    <p> {crypto.circulating_supply.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} </p>
                  </div>

                  <div className="data">
                    <p> {crypto.market_cap_change_percentage_24h.toFixed(2)}% </p>
                  </div>

                </div>

              )
            }
          })}
        </div>
        {this.state.modalActive ? <SingleCoin
          symbol={this.state.singleCoin.symbol}
          name={this.state.singleCoin.name}
          id={this.state.singleCoin.id}
          description={this.state.singleCoin.description}
          toggleModal={() => this.toggleModal()} /> : null}
      </>

    )
  }
}

export default HomePage

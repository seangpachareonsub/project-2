import React from 'react'
import axios from 'axios'
import SingleCoin from './SingleCoin'
import Header from './Header'

class HomePage extends React.Component {

  constructor() {
    super()
    this.state = {
      exchanges: [],
      headings: ['Rank', 'Name', 'Market Cap', 'Price', 'Total Volume', 'Circulating Supply', 'M. Cap Change (24h)'],
      modalActive: false,
      singleCoinInfo: {},
      base: 'USD'
    }
  }

  componentDidMount() {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(response => this.setState({ exchanges: response.data }))
  }

  change(e) {
    const symbol = e.target.value

    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${symbol}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(response => this.setState({ exchanges: response.data, 
        base: symbol.toUpperCase() }))
  }

  handleClick(crypto) {
    axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.id.toLowerCase()}`)
      .then(response => this.setState({ singleCoinInfo: response.data, 
        modalActive: !this.state.modalActive }))
  }

  callSort(e) {
    const keys = ['market_cap_rank', 'name', 'market_cap', 'current_price', 'total_volume', 'circulating_supply', 'market_cap_change_percentage_24h']
    const { exchanges, headings } = this.state
    const heading = keys[headings.indexOf(e.target.name)]
    const { value } = e.target

    switch (value) {
      case 'descending':
        this.setState({ exchanges: exchanges.sort((a, b) => b[heading] - a[heading]) })
        break
      case 'ascending':
        this.setState({ exchanges: exchanges.sort((a, b) => a[heading] - b[heading]) })
        break
      case 'a-z':
        this.setState({ exchanges: exchanges.sort((a, b) => a[heading].localeCompare(b[heading])) })
        break
      case 'z-a':
        this.setState({ exchanges: exchanges.sort((a, b) => b[heading].localeCompare(a[heading])) })
        break
    }
  }

  toggleModal() {
    this.setState({ modalActive: !this.state.modalActive })
  }


  render() {
    return (
      <>
        <Header />
        <div className="market-container">
          <div id='buffer'> buffer </div>

          <div className="market-headers">

            <div className="base-filters">
              <h1> Base Currency </h1>
              <select onChange={(e) => this.change(e)} id="base">
                <option value="usd">USD</option>
                <option value="btc">BTC</option>
                <option value="eth">ETH</option>
                <option value="xrp">XRP</option>
                <option value="bch">BCH</option>
                <option value="ltc">LTC</option>
                <option value="jpy">JPY</option>
                <option value="gbp">GBP</option>
                <option value="eur">EUR</option>
              </select>
            </div>

            <header>
              {this.state.headings.map((headers, i) => {
                return (
                  <div key={i}>
                    <h1> {headers} </h1>

                    {headers === 'Name' ?
                      <select name='Name'
                        onChange={(e) => this.callSort(e)}>
                        <option disabled selected>Sort</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                      </select>
                      :
                      <select name={headers}
                        onChange={(e) => this.callSort(e)}>
                        <option disabled selected>Sort</option>
                        <option value="ascending"> Ascending </option>
                        <option value="descending">Descending</option>
                      </select>}

                  </div>
                )
              })}
            </header>
          </div>

          <div key={crypto.id} className="table">
            {this.state.exchanges.map((crypto, i) => {
              const { base } = this.state

              return (
                <div key={i} className="data-rows" onClick={() => this.handleClick(crypto)}>

                  <div> <h1> {crypto.market_cap_rank} </h1> </div>

                  <div value={crypto.name}>
                    <img src={crypto.image} />
                    <h1 id='name' style={{ color: '#d49677', fontWeight: 'bold' }}> {crypto.name} </h1>
                  </div>

                  <div> <p> {crypto.market_cap.toLocaleString() + ' ' + base} </p> </div>

                  <div> <p> {crypto.current_price.toFixed(2).toLocaleString() + ' ' + base} </p> </div>

                  <div> <p> {crypto.total_volume.toLocaleString() + ' ' + base} </p> </div>

                  <div> <p> {crypto.circulating_supply.toLocaleString() + ' ' + crypto.symbol.toUpperCase()} </p> </div>

                  <div>
                    <p style={crypto.market_cap_change_percentage_24h > 0 ? { color: 'lightseagreen' } :
                      { color: 'red' }}> {crypto.market_cap_change_percentage_24h.toFixed(2)}% </p>
                  </div>

                </div>
              )
            })}

          </div>
          {this.state.modalActive ?
            <SingleCoin
              singleCoin={this.state.singleCoinInfo}
              toggleModal={() => this.toggleModal()} />
            : null}
        </div>
      </>
    )
  }
}

export default HomePage

import React from 'react'
import axios from 'axios'
import SingleCoin from './SingleCoin'
import Header from './Header'





class HomePage extends React.Component {

  constructor() {
    super()
    this.state = {
      exchanges: [],
      headings: ['Rank', 'Name', 'Market Cap', 'Price', 'Total Volume', 'Circulating Supply', 'Market Cap Change (24h)'],
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
        console.log(response.data)
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

  callSort(event) {

    // console.log(event.target.className)
    if (event.target.name === 'Rank') {
      this.setState({ exchanges: this.state.exchanges.sort(this.rankSort) })
    } else if (event.target.name === 'name') {
      this.setState({ exchanges: this.state.exchanges.sort(this.idSort) })
    } else if (event.target.name === 'Market Cap') {
      this.setState({ exchanges: this.state.exchanges.sort(this.marketCapSort) })
    } else if (event.target.name === 'Price') {
      this.setState({ exchanges: this.state.exchanges.sort(this.priceSort) })
    } else if (event.target.name === 'Total Volume') {
      this.setState({ exchanges: this.state.exchanges.sort(this.totalVolumeSort) })
    } else if (event.target.name === 'Circulating Supply') {
      this.setState({ exchanges: this.state.exchanges.sort(this.supplySort) })
    } else if (event.target.name === 'Market Cap Change (24h)') {
      this.setState({ exchanges: this.state.exchanges.sort(this.dayChangeSort) })
    }
  }

  rankSort(a,b) {
    const rankA = a.market_cap_rank
    const rankB = b.market_cap_rank
    const filter = document.getElementsByClassName('Rank')[0]

    if (filter.value === 'ascending') {
      return rankA - rankB

    } else {
      return rankB - rankA
    }
  }

  dayChangeSort(a, b) {

    const marketCapA = a.market_cap_change_percentage_24h
    const marketCapB = b.market_cap_change_percentage_24h
    const filter = document.getElementsByClassName('Market Cap Change (24h)')[0]

    if (filter.value === 'ascending') {
      return marketCapA - marketCapB

    } else {
      return marketCapB - marketCapA
    }

  }

  supplySort(a, b) {

    const marketCapA = a.circulating_supply
    const marketCapB = b.circulating_supply
    const filter = document.getElementsByClassName('Circulating Supply')[0]

    if (filter.value === 'ascending') {
      return marketCapA - marketCapB

    } else {
      return marketCapB - marketCapA
    }

  }

  priceSort(a, b) {

    const marketCapA = a.current_price
    const marketCapB = b.current_price
    const filter = document.getElementsByClassName('Price')[0]

    if (filter.value === 'ascending') {
      return marketCapA - marketCapB

    } else {
      return marketCapB - marketCapA
    }

  }

  totalVolumeSort(a, b) {


    const marketCapA = a.total_volume
    const marketCapB = b.total_volume
    const filter = document.getElementsByClassName('Total Volume')[0]

    if (filter.value === 'ascending') {
      return marketCapA - marketCapB
    } else {
      return marketCapB - marketCapA
    }

  }

  // handle sort for marketcap
  marketCapSort(a, b) {


    const marketCapA = a.market_cap
    const marketCapB = b.market_cap
    const filter = document.getElementsByClassName('Market Cap')[0]

    if (filter.value === 'ascending') {
      return marketCapA - marketCapB
    } else {
      return marketCapB - marketCapA
    }

  }


  // handle sort for name
  idSort(a, b) {

    const idA = a.id.toUpperCase()
    const idB = b.id.toUpperCase()
    const filter = document.getElementsByClassName('Name')[0]
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

    return (

      <>

        <Header />

        <div className="market-headers">
          <div className="base-filters">
            <label> Base Filter <br />
              <select onChange={(event) => this.change(event)} id="base">
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
            </label>
          </div>

          {this.state.headings.map((headers, i) => {
            return (
              <div key={i} className='data-headings'>
                <h1 > {headers} </h1>

                {headers === 'Name' ?
                  <select className='Name' name="name"
                    onChange={(event) => this.callSort(event)}>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                  </select>
                  :
                  <select className={headers} name={headers}
                    onChange={(event) => this.callSort(event)}>
                    <option value="ascending"> Ascending </option>
                    <option value="descending">Descending</option>
                  </select>}

              </div>

            )
          })}

        </div>



        <div key={crypto.id} className="table">

          {this.state.exchanges.map((crypto, i) => {
            if (i < 90) {



              return (

                <div className="data-row-container" onClick={() => this.handleClick(crypto)}>


                  <div className="cRank">
                    <h1> {crypto.market_cap_rank} </h1>
                  </div>


                  <div value={crypto.name} className="cName">
                    <img src={crypto.image} />
                    <h1 id='name' style={{ color: '#d49677' }}> {crypto.name} </h1>
                  </div>


                  <div className="cCap">
                    <p> {crypto.market_cap.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + ' ' + this.state.base} </p>
                  </div>

                  <div className="cPrice">
                    <p> {crypto.current_price.toFixed(2).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + ' ' + this.state.base} </p>
                  </div>

                  <div className="cVolume">
                    <p> {crypto.total_volume.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + ' ' + this.state.base} </p>
                  </div>

                  <div className="cSupply">
                    <p> {crypto.circulating_supply.toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + ' ' + crypto.symbol.toUpperCase()} </p>
                  </div>

                  <div className="cChange">
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

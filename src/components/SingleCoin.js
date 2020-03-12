// import axios from 'axios'
import TradingViewWidget from 'react-tradingview-widget'
import React from 'react'


// class SingleCoin extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       data: [],
//       description: ''
//     }
//   }

//   componentDidMount() {


//     axios.get(`https://api.coingecko.com/api/v3/coins/${this.props.match.params.id.toLowerCase()}`)
//       .then(response => {
//         this.setState({ data: response.data, description: response.data.description })
//       })
//   }


//   render() {

//     return (
//       <div className="modal is-active">
//         <div className="modal-background"></div>
//         <div className="modal-content">
//           <TradingViewWidget
//             theme='dark'
//             symbol={this.state.data.symbol + 'usd'}
//             width='780'
//             height='410'
//             interval='D'
//             timezone='Etc/UTC'
//             style='1'
//             locale='en'
//             toolbar_bg='#f1f3f6'
//             enable_publishing={false}
//             hide_legend={false}
//             hide_side_toolbar={false}
//             allow_symbol_change={false}
//             save_image={false}
//             details={true}
//           />

//           <h1> {this.state.data.name} </h1>
//           <div className='description' dangerouslySetInnerHTML={{ __html: this.state.description.en }} />
//         </div>
//         <button className="modal-close is-large" aria-label="close"></button>
//       </div>
//     )
//   }
// }

// export default SingleCoin

const SingleCoin = ({ symbol, id, description, toggleModal }) => {
  return (<div className="modal is-active">
    <div className="modal-background" onClick={toggleModal}></div>
    <div className="modal-content" id="blah">

      <h1> {(id).toUpperCase()} ({(symbol).toUpperCase()}) </h1>


      <TradingViewWidget
        theme='dark'
        symbol={symbol + 'usd'}
        width='600'
        height='310'
        interval='D'
        timezone='Etc/UTC'
        style='3'
        locale='en'
        toolbar_bg='#f1f3f6'
        enable_publishing={false}
        hide_legend={false}
        hide_side_toolbar={true}
        allow_symbol_change={false}
        save_image={false}
        details={true}
      />

    
      <div className='description' dangerouslySetInnerHTML={{ __html: description.en }} />
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
  </div>
  )
}

export default SingleCoin
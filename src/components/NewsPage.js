import React from 'react'
import axios from 'axios'

import Header from './Header'

const imagesArr = []

class NewsPage extends React.Component {
  constructor() {
    super()
    this.state = {
      mainNews: [],
      secondaryNews: [],
      image: [],
      nav: ['Business', 'Fashion', 'Food', 'Health', 'Politics', 'Real Estate',
        'Science', 'Sports', 'Technology', 'Travel', 'World'],
      query: '',
      headlines: [],
      secondayImages: [],
      search: false
    }
  }

  componentDidMount() {
    axios.get('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=WJACAxScK1FNFg15KpU8rxW9ONYaSc4v')
      .then(response => {
        this.setState({
          mainNews: response.data.results[0], secondaryNews: response.data.results,
          image: response.data.results[0].multimedia[0].url
        })
        // console.log(this.state.secondaryNews)
      })
  }

  changeNews(event) {

    const target = event.target.innerText.toLowerCase().replace(/\s/g, '')
    console.log(target)

    axios.get(`https://api.nytimes.com/svc/topstories/v2/${target}.json?api-key=WJACAxScK1FNFg15KpU8rxW9ONYaSc4v`)
      .then(response => {
        // console.log(response.data)
        this.setState({
          mainNews: response.data.results[0], secondaryNews: response.data.results,
          image: response.data.results[0].multimedia[0].url
        })
      })
  }

  storeSearch(event) {
    this.setState({ query: event.target.value })

  }

  handleSearch(event) {
    event.preventDefault()
    // console.log(this.state.query)

    axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.state.query}&api-key=WJACAxScK1FNFg15KpU8rxW9ONYaSc4v`)
      .then(response => {
        this.setState({
          mainNews: response.data.response.docs[0], secondaryNews: response.data.response.docs,
          image: 'https://static01.nyt.com/' + response.data.response.docs[0].multimedia[0].legacy.xlarge,
          headlines: response.data.response.docs[0].headline['main'],
          search: true
        })

        response.data.response.docs.map(images => {
          imagesArr.push('https://static01.nyt.com/' + images.multimedia[14].url)
        })
        this.setState({ secondaryImages: imagesArr })
        console.log(response.data.response.docs)
      })
  }




  render() {
    return (
      <>

        <Header />

        <section className="news">

          <div id='buffer'> buffer </div>

          <div className='title'>
            <h1> WORLD NEWS </h1>
            <form onSubmit={(event) => this.handleSearch(event)} onChange={(event) => this.storeSearch(event)} className='search'>
              <input autoComplete='off' type="text" placeholder="Search for news" name="search"></input>
              <button type="submit"> <ion-icon name="search"></ion-icon> </button>
            </form>
          </div>



          <div className='topics'>
            <ul>
              {this.state.nav.map((links, i) => {
                return <li onClick={(event) => this.changeNews(event)} className='news-links' value={links} key={i}> {links} </li>
              })}
            </ul>
          </div>

          <a href={this.state.mainNews.url ? this.state.mainNews.url : this.state.mainNews.web_url} target='_blank'>
            <div className="jumbotron">
              <div>
                <img className='hero' src={this.state.image} />
              </div>
              <div className='jumbotron-content'>
                <p style={{ textTransform: 'capitalize' }}> {this.state.mainNews.section ? this.state.mainNews.section : this.state.mainNews.section_name} </p>
                <h1> {this.state.mainNews.title ? this.state.mainNews.title : this.state.headlines} </h1>
                <small> {this.state.mainNews.abstract} </small>
              </div>
            </div>
          </a>


          <div className="secondary-one">

            {this.state.secondaryNews.map((article, i) => {
              if (i !== 0 && i !== 0 && i < 12) {
                return (

                  <a key={i} href={article.url ? article.url : article.web_url}>
                    <div className='article'>

                      <img className='secondary-pic' src={this.state.search ? 'https://static01.nyt.com/' + article.multimedia[1].url : article.multimedia !== null ? article.multimedia[3].url : null} />


                      <div className="article-content">
                        <p style={{ textTransform: 'capitalize' }}> {article.section ? article.section : article.section_name} </p>
                        <h1>{article.title ? article.title : article.headline['main']} </h1>
                        <small> {article.abstract}</small>
                      </div>
                    </div>
                  </a>
                )
              }
            })}
          </div>

          <div className="secondary-two">

            {this.state.secondaryNews.map((article, i) => {
              if (i !== 0 && i !== 0 && i > 12 && i < 19) {
                return (

                  <a key={i} href={article.url ? article.url : article.web_url}>
                    <div className='article' >
                      <div className="image">
                        <img className='secondary-pic' src={this.state.search ? 'https://static01.nyt.com/' + article.multimedia[1].url : article.multimedia !== null ? article.multimedia[3].url : null} />
                      </div>

                      <div className="article-content">
                        <p style={{ textTransform: 'capitalize' }}> {article.section ? article.section : article.section_name} </p>
                        <h1>{article.title ? article.title : article.headline['main']} </h1>
                        <small> {article.abstract}</small>
                      </div>
                    </div>

        
                  </a>
                )
              }
            })}
          </div>

        </section>
      </>
    )
  }

}

export default NewsPage
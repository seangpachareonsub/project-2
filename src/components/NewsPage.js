import React from 'react'
import axios from 'axios'
import Header from './Header'

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
      search: false
    }
  }

  componentDidMount() {
    // v
    axios.get('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=WJACAxScK1FNFg15KpU8rxW9ONYaSc4')
      .then(response => {
        this.setState({
          mainNews: response.data.results[0],
          image: response.data.results[0].multimedia[0].url,
          secondaryNews: response.data.results
        })
      })
  }

  changeNews(e) {
    const target = e.target.innerText.toLowerCase().replace(/\s/g, '')
    // v
    axios.get(`https://api.nytimes.com/svc/topstories/v2/${target}.json?api-key=WJACAxScK1FNFg15KpU8rxW9ONYaSc4`)
      .then(response => {
        this.setState({
          mainNews: response.data.results[0],
          image: response.data.results[0].multimedia[0].url,
          secondaryNews: response.data.results
        })
      })
  }

  storeSearch(e) {
    this.setState({ query: e.target.value })
  }

  handleSearch(e) {
    e.preventDefault()
    // v
    axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.state.query}&api-key=WJACAxScK1FNFg15KpU8rxW9ONYaSc4`)
      .then(response => {
        const { docs } = response.data.response

        this.setState({
          mainNews: docs[0], 
          secondaryNews: docs,
          image: 'https://static01.nyt.com/' + docs[0].multimedia[0].legacy.xlarge,
          headlines: docs[0].headline['main'],
          search: true
        })
      })
  }

  render() {
    const { mainNews, headlines, nav, image, search } = this.state

    return (
      <>
        <Header />
        <section className="news">
          <div id='buffer'> buffer </div>

          <div className='title'>
            <h1> WORLD NEWS </h1>
            <form onSubmit={(e) => this.handleSearch(e)} onChange={(e) => this.storeSearch(e)} className='search'>
              <input autoComplete='off' type="text" placeholder="Search for news" name="search"></input>
              <button type="submit"> <ion-icon name="search"></ion-icon> </button>
            </form>
          </div>

          <div className='topics'>
            <ul>
              {nav.map((links, i) => {
                return <li onClick={(e) => this.changeNews(e)} className='news-links' value={links} key={i}> {links} </li>
              })}
            </ul>
          </div>


          {/* JUMBOTRON SECTION  */}
          <a href={mainNews.url ? mainNews.url : mainNews.web_url}>
            <div className="jumbotron">
              <img className='hero' src={image} />
              <div className='jumbotron-content'>
                <p style={{ textTransform: 'capitalize' }}> {mainNews.section ? mainNews.section : mainNews.section_name} </p>
                <h1> {mainNews.title ? mainNews.title : headlines} </h1>
                <small> {mainNews.abstract} </small>
              </div>
            </div>
          </a>

          {/* SECONDARY NEWS SECTION  */}
          <div className="secondary-one">

            {this.state.secondaryNews.map((article, i) => {
              if (i !== 0 && i < 12) {
                return (
                  <a key={i} href={article.url ? article.url : article.web_url}>
                    <div className='article'>
                      <img className='secondary-pic' src={search ? 'https://static01.nyt.com/' + article.multimedia[1].url : article.multimedia !== null ? article.multimedia[3].url : null} />

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
              if (i !== 0 && i > 12 && i < 19) {
                return (

                  <a key={i} href={article.url ? article.url : article.web_url}>
                    <div className='article' >
                      <img className='secondary-pic' src={search ? 'https://static01.nyt.com/' + article.multimedia[1].url : article.multimedia !== null ? article.multimedia[3].url : null} />


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
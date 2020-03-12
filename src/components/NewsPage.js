import React from 'react'
import axios from 'axios'
import Header from './Header'



class NewsPage extends React.Component {
  constructor() {
    super()
    this.state = {
      mainNews: [],
      secondaryNews: [],
      image: []
    }
  }

  componentDidMount() {
    axios.get('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=WJACAxScK1FNFg15KpU8rxW9ONYaSc4v')
      .then(response => {
        this.setState({
          mainNews: response.data.results[0], secondaryNews: response.data.results,
          image: response.data.results[0].multimedia[0].url
        })
        console.log(this.state.secondaryNews)
      })
  }

  render() {

    return (

      <>

        <Header />

        <section className="news">

          <h1 className='news-title'>TOP TRENDING ARTICLES</h1>

          <a href={this.state.mainNews.url} target='_blank'>
            <div className="jumbotron">
              <div>
                <img className='hero' src={this.state.image} />
              </div>
              <div className='jumbotron-content'>
                <p style={{ textTransform: 'capitalize' }}> {this.state.mainNews.section} </p>
                <h1> {this.state.mainNews.title} </h1>
                <small> {this.state.mainNews.abstract} </small>
              </div>
            </div>
          </a>


          <div className="secondary">
            {this.state.secondaryNews.map((article, i) => {
              if (i !== 0 && i !== 33) {
                return (

                  <a key={i} href={article.url} target='_blank'>
                    <div className='article' >


                      <div className="image">
                        <img className='secondary-pic' src={article.multimedia[3].url} />
                      </div>

                      <div className="article-content">
                        <p style={{ textTransform: 'capitalize' }}> {article.section} </p>
                        <h1>{article.title} </h1>
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
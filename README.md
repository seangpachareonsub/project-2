### ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) General Assembly, Software Engineering Immersive

## Financier

### Overview

This is my second project of the Software Engineering bootcamp at GA London. The assignment was a mini hackathon to build a React application that consumes a public API.

Making use of the New York Times and CoinGecko public API, Financier functions as a news website that also includes a CryptoCurrency market data page.

* **Project Duration:** 48 hours
* **Work Environment:** Paired project

You can launch the game on [GitHub pages](), or find the [GitHub repository](https://github.com/seangpachareonsub/financier).

#### Technical Requirements:
* Consume a public API – this could be anything but it must make sense for your project.
* Have several components - At least one classical and one functional.
* The app should include a router - with several "pages".
* Be deployed online and made accessible to the public.

#### Technologies Used:
* JavaScript (ES6)
* React.js
* HTML, JSX
* SCSS
* Moment.js
* CoinGecko API
* New York Times API
* TradingView widget
* Git and GitHub
* Google Fonts

## Approach

We decided as a team to search for an open working API which had world news data we could display. We chose the New York Times (NYT) public API and began wireframing the website, gave ourselves a timeframe to finish the logic aspect on the first day and styling on the second day.​

After a quick test with the NYT API, we quickly discovered that the response given back was not as detailed as we had hoped and not enough for an entire website. Therefore, with our mutual interest in CryptoCurrencies, we decided to couple the NYT API with CoinGecko's to create a news webpage with a market data section.

#### The main features we decided on:

* The news page acting as our landing page
* The landing page would first display Finance related news
* Search input that allows users to search for specific topics
* A navbar which routes to the pages.
* The market data will be CrytoCurrency heavy as that's the information the API gave us  
* An user interactive chart widget provided by TradingView 

#### The routing of pages we decided on:

1. The news page at path `/`
2. The market data page at `/coins`
3. The interactive price charts would be displayed as a modal overlay and therefore not require their own path (i.e. still on `/coins`)

### News Page

We drew inspiration from other news webpages such as BBC, Financial Times and The Economist. A common theme amongst them was that their news page was also acted as their landing page. We thought this structure made sense for a small website with very few pages and decided to follow it.

The NYT API provided us with a `/topstories` endpoint which returned the latest news articles for a specific topic. Once our news component mounted we:

1. Sent out a GET request to the `/topstories` endpoint
2. Once the promise was fulfilled, we used `this.setState` to store the data given back
3. We isolated the first article and it's image which we used as a jumbotron for the page

```
componentDidMount() {
  axios.get('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=WJACAxScK1FNFg15KpU8rxW9ONYaSc4v')
    .then(response => {
      this.setState({
        mainNews: response.data.results[0], 
        image: response.data.results[0].multimedia[0].url,
        secondaryNews: response.data.results
      })
    })
}
```

**NOTE:** This endpoint is used also when users wish to change news topics. By default the page renders business related articles but we've provided users a mini topic navbar which renders different genres.

#### Rendering the articles

Using JavaScript's array `map()` method we were able to render the following for each news article stored within our state:

* The image of the article
* Section name of the news (i.e. Climate, US, World)
* Article title / headline
* Abstract of the article

```
{this.state.secondaryNews.map((article, i) => {
  return (
    <a key={i} href={article.url ? article.article.web_url}>
      <div className='article'>

        <img className='secondary-pic{this.state.search ? 
        'https://static01.nyt.com/' + article.multimedia[1].url :
        article.multimedia !== null ? article.multimedia[3].url : 
        null} />

        <div className="article-content">
          <p> {article.section ? article.section : article.section_name} </p>
          <h1> {article.title ? article.titile : article.headline['main']}  </h1>
          <small> {article.abstract} </small>
        </div>

      </div>
    </a> 
  )}
})}
```

**NOTES:** 

* Articles are enclosed with an `<a>` tag which directs them to the NYT website if users wish to read more
* The key names within the API responses given back from the `/topstories` and `/search` endpoints differ. Therefore, upon rendering, a ternary statement is needed. It checks which key name is being returned from the API and then subsequently, renders that information.

#### Searching for articles

Implementing the `/search` endpoint of the API, the site provides users the ability to search for specific news topics. This is handled through a form on the page that includes a search input.

The `storeSearch()` function is invoked `onChange` of the search form

```
storeSearch(e) {
  this.setState({ query: e.target.value })
}
```

`onSubmit` of the form, the `handleSearch()` function is invoked which handles the GET request sent to the endpoint. `this.setState` is utilised to store the data once the promise is fulfilled and the page re-renders automatically.

```
handleSearch(e) {
  e.preventDefault()

  axios.get(`https://api.nytimes.com/svc/search/v2articlesearch.json?q=${this.state.query}api-key=WJACAxScK1FNFg15KpU8rxW9ONYaSc4v`)
    .then(response => {
      const { docs } = response.data.response

      this.setState({
        mainNews: docs[0], 
        secondaryNews: docs,
        image: 'https://static01.nyt.com/' + docs[0].multimedia[0.legacy.xlarge,
        headlines: docs[0].headline['main'],
        search: true
      })
    })
}
```

### Market Data Page

This page serves the purpose to give users up to date CryptoCurrency insight by implementing the CoinGecko public API. We display the top 100 CryptoCurrencies currently dominating the market.

When the component first mounts, we send a GET request to the `/coin` endpoint inside a `componentDidMount()`. Inside the promise chain, the response is stored into state. 

```
componentDidMount() {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(response => this.setState({ exchanges: response.data }))
}
```

#### Base Currrency

By default, we've compared each currency price against the USD. Users are able to change the base currency using a `<select>` provided. `onChange` of the `<select>`, the `change()` function is invoked which mimics the GET request sent when the component first mounts. The response is again stored into state and causes the page to re-render.

#### Filtering 

The page gives users the power to sort the market data alphabetically or numerically. Each heading has it's own `<select>` dropdown with different sorting options (i.e. a-z, z-a, ascending, descending). `callSort()` function is ran `onChange` of any of the dropdowns.

1. We store the heading of which specific data information the user wants sorted in `const heading`. The heading is an element from the `keys` array, where the index number of the element matches that of the one stored in state.
2. Using a `switch` statement, we're able to run a different sort method, depending on the value of the dropdown.
3. Each sort method holds a different comparison function and we set the sorted data in state.

```
callSort(e) {
  const { exchanges, headings } = this.state
  const { value } = e.target

  const keys = ['market_cap_rank', 'name', 'market_cap', 'current_price',
  'total_volume', 'circulating_supply', 'market_cap_change_percentage_24h']
  const heading = keys[headings.indexOf(e.target.name)]
  
  switch (value) {
    case 'descending':
      this.setState({ exchanges: exchanges.sort((a, b) => b[heading] - a[heading]) })
      break
    case 'ascending':
      this.setState({ exchanges: exchanges.sort((a, b) => a[heading] - a[heading]) })
      break
    case 'a-z':
      this.setState({ exchanges: exchanges.sort((a, b) => a[heading.localeCompare(b[heading])) })
      break
    case 'z-a':
      this.setState({ exchanges: exchanges.sort((a, b) => b[heading.localeCompare(a[heading])) })
      break
    }
  }
```

**NOTE:** `headings` is a piece of state that holds the displayed headings of the currency (i.e. name, volume rank). The `keys` array holds the actual response keys from the API. `const headings` looks to match the index numbers from each array.

#### Coin Modal

Users are able to click on any of the 100 CryptoCurrencies displayed which renders a modal overlay on top of the current page. The modal provides an interactive price chart and a descriptive paragraph about the coin. 

Toggling between a piece of state called `modalActive` renders the modal. When set to `true`, props containing coin information are passed to a `SingleCoin` component.

```
{this.state.modalActive ?
  <SingleCoin
    singleCoin={this.state.singleCoinInfo}
    toggleModal={() => this.toggleModal()} />
: null}
```

### Screenshots

![](images/Screenshot%202020-05-04%20at%2001.29.29.png)
![](images/Screenshot%202020-05-04%20at%2001.29.46.png)
![](images/Screenshot%202020-05-04%20at%2001.29.59.png)
![](images/Screenshot%202020-05-04%20at%2001.30.15.png)

### Bugs
The `/search` endpoint for the NYT API at times returns no response. This only occurs when the user searches for certain topics and the page becomes blank. 

### Potential future features and improvements
* Include other economic markets (i.e. Stocks, FX, Indicies)
* Responsive design. Mobile friendly
* A filter function on market data, allowing users to filter betweenspecific values  

### Lessons learned
* Depending on the structure of the API, it can be quite tedious to get all the information that you want. Different endpoints return different key value pairs so many ternary statements are needed in order to render the correct information
* Design mobile first. Mobile websites and apps have increasingly popular for people. A mobile friendly design has a simpler structure than a desktop webpage which may have catered to the short project duration.
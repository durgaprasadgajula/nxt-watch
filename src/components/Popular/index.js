import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    popularData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.renderPopularMoviesData()
  }

  renderPopularMoviesData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(eachMovie => ({
        title: eachMovie.title,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        id: eachMovie.id,
        posterUrl: eachMovie.poster_path,
      }))
      console.log(updatedData)
      this.setState({
        popularData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {popularData} = this.state
    return (
      <div className="popular-movie-container">
        <ul className="popular-ul-container">
          {popularData.map(each => (
            <Link to={`/movies/${each.id}`} key={each.id} target="blank">
              <li className="popular-li-item" key={each.id}>
                <img
                  className="popular-poster"
                  src={each.posterUrl}
                  alt={each.title}
                />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  onRetry = () => {
    this.renderPopularMoviesData()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader
        testid="loader"
        type="TailSpin"
        height={35}
        width={380}
        color="#D81F26"
      />
    </div>
  )

  renderPopularMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="Popular-container">
        <Header />
        <div className="popular-result-container">
          {this.renderPopularMovies()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Popular

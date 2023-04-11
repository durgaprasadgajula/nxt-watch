import {Switch, Route, Redirect} from 'react-router-dom'

import LoginPage from './components/LoginPage'

import './App.css'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import ProfilePage from './components/ProfilePage'
import Popular from './components/Popular'
import SearchFilter from './components/SearchResult'
import MovieDetailView from './components/MovieDetailView'
import NotFound from './components/NotFound'
import Account from './components/Account'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/profilepage" component={ProfilePage} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetailView} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={SearchFilter} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App

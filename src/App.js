import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// CONTEXTS
import { ProfileProvider } from './contexts/ProfileContext'


// COMPONENTS
import TopNav from './components/TopNav'

// STYLES
import 'bootstrap/dist/css/bootstrap.min.css'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/Theme'

// VIEWS
import LoginPage from './views/auth/LoginPage'
import UserProfilePage from './views/app/UserProfilePage'
import NameDetails from './components/NameDetails'
import SignupPage from './views/auth/SignupPage'
import SwiperPage from './views/app/SwiperPage/SwiperPage'
import PreferencesPage from './views/app/PreferencesPage/PreferencesPage'
import MatchPage from './views/app/MatchPage'
import LikedNamesPage from './views/app/LikedNamesPage'
import RecommendedPage from './views/app/RecommendedPage'
import SplashPage from './views/app/SplashPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ProfileProvider>
          <Router>
            {localStorage.getItem('access_token') ? <TopNav /> : <div></div>}
            <Switch>
              {localStorage.getItem('access_token') ? <Route path='/' component={UserProfilePage} exact /> : <Route path='/' component={SplashPage} exact />}
              <Route path='/login' component={LoginPage} exact />
              <Route path='/user-profile' component={UserProfilePage} exact />
              <Route path='/name-detail' component={NameDetails} exact />
              <Route path='/signup' component={SignupPage} exact />
              <Route path='/swiper' component={SwiperPage} exact />
              <Route path='/preferences' component={PreferencesPage} exact />
              <Route path='/liked-names' component={LikedNamesPage} exact />
              <Route path='/matchpage' component={MatchPage} exact />
              <Route path='/recommendations' component={RecommendedPage} exact />
            </Switch>
          </Router>
        </ProfileProvider>
      </div>
    </ThemeProvider>
  )
}

export default App;

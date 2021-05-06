import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// CONTEXTS
import { ProfileProvider } from './contexts/ProfileContext';


// COMPONENTS
import TopNav from './components/TopNav'

// STYLESHEETS
import 'bootstrap/dist/css/bootstrap.min.css'

// VIEWS
import LoginPage from './views/auth/LoginPage'
import UserProfilePage from './views/app/UserProfilePage'
import NameDetailsPage from './views/app/NameDetailsPage';
import SignupPage from './views/auth/SignupPage';
import SwiperPage from './views/app/SwiperPage/SwiperPage';
import PreferencesPage from './views/app/PreferencesPage/PreferencesPage';
import MatchPage from './views/app/MatchPage';
import LikedNamesPage from './views/app/LikedNamesPage'

function App() {
  return (
    <div className="App">
      <ProfileProvider>
      <Router>
        <TopNav />
        <Switch>
          <Route path='/login' component={LoginPage} exact />
          <Route path='/user-profile' component={UserProfilePage} exact />
          <Route path='/name-detail' component={NameDetailsPage} />
          <Route path='/signup' component={SignupPage} />
          <Route path='/swiper' component={SwiperPage} />
          <Route path='/preferences' component={PreferencesPage} />
          <Route path='/matchpage' component={MatchPage} />
          <Route path='/liked-names' component={LikedNamesPage} />
        </Switch>
      </Router>
      </ProfileProvider>
    </div>
  );
}

export default App;

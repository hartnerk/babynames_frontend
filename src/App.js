import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


// COMPONENTS
import TopNav from './components/TopNav'
import Button from 'react-bootstrap/Button'

// STYLESHEETS
import 'bootstrap/dist/css/bootstrap.min.css'

// VIEWS
import LoginPage from './views/auth/LoginPage'
import UserProfilePage from './views/app/UserProfilePage'
import NameDetailsPage from './views/app/NameDetailsPage';
import SignupPage from './views/auth/SignupPage';




function App() {
  return (
    <div className="App">
      <Router>
        <TopNav />
        <Switch>
          <Route path='/login' component={LoginPage} exact />
          <Route path='/user-profile' component={UserProfilePage} exact />
          <Route path='/name-detail' component={NameDetailsPage} />
          <Route path='/signup' component={SignupPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

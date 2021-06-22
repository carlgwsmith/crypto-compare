import Dashboard from "./Dashboard"
import Home from './Home'
import Results from "./Results"
import Settings from './Settings'
import Profile from './Profile'
import UpdateProfile from './components/UpdateProfile'
import Login from './components/Login'
import CoinOverview from './components/CoinOverview'
import ForgotPassword from './components/ForgotPassword'
import CustomNav from './components/CustomNav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from './components/PrivateRoute'

function App() {


  return (
    <Router>
      <AuthProvider>
      <div className="App">
        <CustomNav/>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/forgot-password" component={ForgotPassword}/>
        <PrivateRoute path="/Dashboard" component={Dashboard}/>
        <PrivateRoute path="/Settings" component={Settings}/>
        <PrivateRoute path="/update-profile" component={UpdateProfile}/>
        <PrivateRoute path="/Profile" component={Profile}/>
        <PrivateRoute path="/Results" component={Results}/>
        <Route path="/coin/:coinId" render={(props) => (
          <CoinOverview {...props} />
        )}/>
        </Switch>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

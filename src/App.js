import Dashboard from "./Dashboard"
import Home from './Home'
import Results from "./Results"
import CustomNav from './components/CustomNav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <AuthProvider>
      <div className="App">
        <CustomNav/>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/Dashboard" component={Dashboard}/>
        <Route path="/Results" component={Results}/>
        </Switch>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

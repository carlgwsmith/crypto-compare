import Home from "./Home"
import Signup from './components/Signup'
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
        <Route path="/" exact component={Signup}/>
        <Route path="/Home" component={Home}/>
        <Route path="/Results" component={Results}/>
        </Switch>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

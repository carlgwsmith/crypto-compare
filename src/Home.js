import Signup from './components/Signup'
import Login from './components/Login'
import TopSlider from './components/TopSlider'

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="Dashboard">
        <TopSlider/>
      <div className="row topCryptos">
      </div>
        <div className="row">
          <div className="col-sm-12">
              <Signup/>
          </div>
          <div className="col-sm-12">
              <Login/>
          </div>
        </div>
    </div>
  );
}

export default Home;

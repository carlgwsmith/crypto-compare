import Signup from './components/Signup'
import TopSlider from './components/TopSlider'
import CoinSearch from './components/CoinSearch'

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="Dashboard">
        <TopSlider/>
      <div className="row topCryptos">
      </div>
        <div className="row">
          <div className="col-sm-6">
              <Signup/>
          </div>
          <div className="col-sm-6">
            <CoinSearch/>
          </div>
        </div>
    </div>
  );
}

export default Home;

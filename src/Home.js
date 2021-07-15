import Signup from './components/Signup'
import TopSlider from './components/TopSlider'
import CoinSearch from './components/CoinSearch'

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="Dashboard">
        <TopSlider/>
        <div className="row pt-2 px-4 pb-5">
          <div className="col-sm-12 p-3 pb-4">
          <CoinSearch/>
          </div>
          <div className="col-sm-6">
              <Signup/>
          </div>
          <div className="col-sm-6">
            <img src={process.env.PUBLIC_URL + '/Assets/cryptoart1.svg'} width="100%"></img>
          </div>
        </div>
    </div>
  );
}

export default Home;

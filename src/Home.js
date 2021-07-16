import Signup from './components/Signup'
import TopSlider from './components/TopSlider'
import CoinSearch from './components/CoinSearch'

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="Dashboard">
        <div className="row pt-2 px-4 pb-5">
        <div className="col-12">
          <TopSlider/>
          </div>
        <div className="col-6 heroSection" style={{backgroundImage: "url('"+process.env.PUBLIC_URL+"/Assets/cryptoart25.png')"}}>
          <div className="heroInner">
          <h1 className="heroh1">Analyze.</h1>
          <h1 className="heroh1">Save.</h1>
          <h1 className="heroh1">Compare</h1>
          </div>
        </div>
        <div className="col-sm-6 pt-4">
              <Signup/>
          </div>
          {/* <div className="col-sm-12 p-3">
          <h2>Analyze. Save. Compare.</h2>
          <CoinSearch/>
          </div>
          <div className="col-sm-6">
            <img src={process.env.PUBLIC_URL + '/Assets/cryptoart1.svg'} width="100%"></img>
          </div> */}
        </div>
    </div>
  );
}

export default Home;

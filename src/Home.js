import Signup from './components/Signup'
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
          <div className="col-sm-6">
              <Signup/>
          </div>
        </div>
    </div>
  );
}

export default Home;

//import {useState, useEffect} from 'react'

import CoinSearch from './components/CoinSearch'
import Banner from './components/Banner'
//import Movers from './components/Movers'
//import TinyChart from './components/TinyChart'
import TopSlider from './components/TopSlider'

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  return (
    <div className="Dashboard">
        <TopSlider/>
      <div className="row topCryptos">
      </div>
        <div className="row p-4">
          <div className="col-sm-6"><Banner /></div>
          <div className="col-sm-6"><CoinSearch/></div>
          <div className="col-sm-12">
          </div>
        </div>
    </div>
  );
}

export default Dashboard;

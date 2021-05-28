//import {useState, useEffect} from 'react'

import Search from './components/Search'
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
        <div className="row">
          <div className="col-sm-6"><Banner /></div>
          <div className="col-sm-6"><Search label="Let's analyze a crypto"/></div>
          <div className="col-sm-12">
          </div>
        </div>
    </div>
  );
}

export default Dashboard;

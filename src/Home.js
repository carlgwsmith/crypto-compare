//import {useState, useEffect} from 'react'

import Search from './components/Search'
import Banner from './components/Banner'
//import Movers from './components/Movers'
import TinyChart from './components/TinyChart'
import TopSlider from './components/TopSlider'

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="Home">
        <TopSlider/>
      <div className="row topCryptos">
      </div>
        <Banner />
        <div className="row">
          <div className="col-sm-5"><Search label="Let's analyze a crypto"/></div>
          <div className="col-sm-5">
            <TinyChart/>
          </div>
        </div>
    </div>
  );
}

export default Home;

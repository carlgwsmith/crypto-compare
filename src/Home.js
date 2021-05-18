import {useState, useEffect} from 'react'

import Search from './components/Search'
import Banner from './components/Banner'
import Movers from './components/Movers'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  useEffect(() => {
    fetch("https://coinranking1.p.rapidapi.com/coins", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "576a270f4emshce03cc0d892e394p15648fjsnddb66ef301e9",
		"x-rapidapi-host": "coinranking1.p.rapidapi.com"
	}
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
}, []);

  return (
    <div className="Home">
      <div className="row">
        <div className="col-2"><Movers/></div>
        <div className="col-2"><Movers/></div>
        <div className="col-2"><Movers/></div>
        <div className="col-2"><Movers/></div>
        <div className="col-2"><Movers/></div>
        <div className="col-2"><Movers/></div>
      </div>
        <Banner />
        <div className="row">
          <div className="col-sm-5"><Search label="Let's analyze a crypto"/></div>
        </div>
    </div>
  );
}

export default Home;

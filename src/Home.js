import {useState, useEffect} from 'react'

import Search from './components/Search'
import Banner from './components/Banner'
import Movers from './components/Movers'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
fetch("https://coinranking1.p.rapidapi.com/coins", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "576a270f4emshce03cc0d892e394p15648fjsnddb66ef301e9",
		"x-rapidapi-host": "coinranking1.p.rapidapi.com"
	}
})
.then(response => {
  if(response.ok){
    response.json().then((json) => {
      //console.log(json.data.coins)
      setCoins(json.data.coins)
      setIsLoading(false);
    })
  }
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
          <div className="col-sm-5">
          {isLoading && <p>Wait I'm Loading comments for you</p>}
            {coins.length !== 6}
            {coins.slice(0,6).map((c, index) => (
              <div key={index}>
                    <div>
                      <h2 style={{ textDecoration: "Underline" }}>
                        {c.name}
                      </h2>
                      <p>{c.volume}</p>
                    </div>
                    <hr />
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}

export default Home;

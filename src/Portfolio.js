import React, {useState, useEffect} from 'react';
import { useAuth } from "./Context/AuthContext"
import {database} from "./firebase"
import Chart from "./components/PortfolioChart"
import Wallet from './components/Wallet'

function Portfolio() {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  // const [colors, setColors] = useState([])



useEffect(() => {
  setLoading(true)
  database.users.doc(currentUser.uid).get().then(
  doc => {
      let data = (doc.data());
      if(data === undefined){
          console.log('first timer')
      }else{
          const dataArray = Object.entries(data);
          setCoins(dataArray.[0].[1])
      }
  }
  )
  setLoading(false)
  console.log(coins)
}, []);
useEffect(() => {
  
}, [coins]);

  if(loading || !coins){
        return <h1>loading...</h1>;      
    }
  return (
    <div className="Results">
      <header className="App-header">
        <div className="row px-2 mx-1">
        <div className="col-sm-12">
        <h3>Portfolio</h3>
        <p className="subtitle">Below is a chart of all of your coins and their pricing history.</p>
        <div style={{height:'430px'}}>
          {coins &&
            <Chart data={coins} className="chartContainer" />
            }
        </div>
        </div>
        <div className="col-sm-12">
        {coins.map((coin, index) => (
        <div key={index}>
            <Wallet name={coin.name} color={coin.color} history={coin.history} id={coin.id} uuid={coin.uuid} price={coin.price} symbol={coin.symbol} />
        </div>
        ))}
        </div>
        </div>
      </header>
    </div>
  );
}

export default Portfolio;

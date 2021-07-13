import React, {useState, useEffect} from 'react';
import { useAuth } from "./Context/AuthContext"
import {database} from "./firebase"
import Chart from "./components/PortfolioChart"
import Wallet from './components/Wallet'

function Portfolio() {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const [activeIndex, setActiveIndex] = useState(0)
  const [timeFrame, setTimeFrame] = useState('7d')
  // const [colors, setColors] = useState([])

  function changeTimeFrame(time, index){
    setTimeFrame(time)
    setActiveIndex(index)
}

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

  if(loading || !coins){
        return <h1>loading...</h1>;      
    }
  return (
    <div className="Results">
      <header className="App-header">
        <div className="row px-2 mx-1">
        <div className="col-sm-12 pt-3">
        <h3>Portfolio</h3>
        <p className="subtitle">Below is a chart of all of your coins and their pricing history.</p>
        <span className="timeButtons">
            <button onClick={() => changeTimeFrame('7d', 0)} className={activeIndex === 0 ? "active timeBtn" : "timeBtn"}>7d</button>
            <button onClick={() => changeTimeFrame('30d', 1)} className={activeIndex === 1 ? "active timeBtn" : "timeBtn"}>30d</button>
            <button onClick={() => changeTimeFrame('1y', 2)} className={activeIndex === 2 ? "active timeBtn" : "timeBtn"}>1y</button>
            <button onClick={() => changeTimeFrame('5y', 3)} className={activeIndex === 3 ? "active timeBtn" : "timeBtn"}>5y</button>
        </span>
        </div>
        <div className="col-sm-12">
        <div style={{height:'430px'}}>
          {coins &&
            <Chart data={coins} className="chartContainer" timeFrame={timeFrame}/>
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

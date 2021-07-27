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
  const [coinIndex, setCoinIndex] = useState(null)
  const [timeFrame, setTimeFrame] = useState('7d')
  let userName = ''

  const sendDataToParent = (coin) => {
    setCoinIndex(coin);
  };

  function changeTimeFrame(time, index){
    setTimeFrame(time)
    setActiveIndex(index)
}

if(currentUser){
  let userEmail= currentUser.email
  userName= userEmail.substr(0, userEmail.indexOf('@')); 
  } else {
    userName = ''
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
          //console.log(dataArray)
          setCoins(dataArray.[0].[1])
      }
  }
  )
  setLoading(false)
  
  console.log(coins)
}, []);

useEffect(() => {
  const coinToRemove = coinIndex
  const coinCopy = Array.from(coins)
  console.log(coinCopy)
  console.log(coinToRemove)

  var mod = coinCopy.filter(x => {
    return x.id != coinToRemove
  })

  setCoins(mod)

}, [coinIndex]);

  if(loading){
        return <h1 className="text-center pt-4">loading...</h1>;      
    }
  if(!coins){
      return <h1 className="text-center pt-4">No Coins, please add a coin to view your portfolio.</h1>
  }
  return (
    <div className="Results">
        <div className="row p-2 m-1">
          <div className="col-sm-12">
          <h1><span className="user" style={{textTransform:"capitalize"}}>{userName}'s</span> Portfolio</h1>
          </div>
        </div>
        <div className="row px-2 mx-1">
        <div className="col-sm-12 col-md-8">
        <h3 style={{marginBottom:"0px", borderBottom: "2px solid #e3e3e3"}}>Pricing History</h3>
        <p className="subtitle" style={{display:"inline-block", marginTop:"10px"}}>Below is a chart of all of your coins and their pricing history.</p>
        <span className="timeButtons" style={{marginTop:"8px"}}>
            <button onClick={() => changeTimeFrame('7d', 0)} className={activeIndex === 0 ? "active timeBtn" : "timeBtn"}>7d</button>
            <button onClick={() => changeTimeFrame('30d', 1)} className={activeIndex === 1 ? "active timeBtn" : "timeBtn"}>30d</button>
            <button onClick={() => changeTimeFrame('1y', 2)} className={activeIndex === 2 ? "active timeBtn" : "timeBtn"}>1y</button>
        </span>
        <div style={{height:'430px'}} class="fade-in">
          {coins &&
            <Chart data={coins} className="chartContainer fade-in" timeFrame={timeFrame}/>
            }
        </div>
        </div>
        {/* <div className="col-sm-8">
        <div style={{height:'430px'}} class="fade-in">
          {coins &&
            <Chart data={coins} className="chartContainer" timeFrame={timeFrame}/>
            }
        </div>
        </div> */}
        <div className="col-sm-12 col-md-4 mb-4 pb-4">
        <h3 style={{borderBottom: "2px solid #e3e3e3"}}>Coins</h3>
        <p className="subtitle">Below is a list of the coins in your portfolio.</p>
        {coins.map((coin, index) => (
        <div key={index}>
            <Wallet name={coin.name} color={coin.color} history={coin.history} id={coin.id} uuid={coin.uuid} price={coin.price} symbol={coin.symbol} sendDataToParent={sendDataToParent}  />
        </div>
        ))}
        </div>
        </div>
    </div>
  );
}

export default Portfolio;

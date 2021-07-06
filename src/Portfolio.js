import React, {useState, useEffect} from 'react';
import { useAuth } from "./Context/AuthContext"
import {database} from "./firebase"
import Chart from "./components/TinyChart"

function Portfolio() {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const [coinHistory, setCoinHistory] = useState({})
  const [colors, setColors] = useState([])

function getCoins(){
  setLoading(true)
  database.users.doc(currentUser.uid).get().then(
  doc => {
      let data = (doc.data());
      console.log(data);
      if(data === undefined){
          console.log('first timer')
      }else{
          const dataArray = Object.entries(data);
          setCoins(dataArray.[0].[1])
      }
  }
  )
  setLoading(false)
  console.log('success')
}

useEffect(() => {
  let historyArray = []
  let coinColor=[]
  for(let i = 0; i < coins.length; i++){
    if(coins.color){
    coinColor.push(coins[i].color)
    }
    historyArray.push(coins[i].history);
  }
  setCoinHistory(historyArray) 
  setColors(coinColor)
}, [coins]);

useEffect(() => {
  getCoins()
  console.log(coinHistory)
}, []);



  return (
    <div className="Results">
      <header className="App-header">
        <div className="row">
        <div style={{height:'430px'}}>
          {coins &&
            <Chart data={coinHistory.[0]} className="chartContainer" color={colors} />
            }
        </div>
          <div className="col-sm-12">Portfolio</div>
          <ul>
          {coins.slice(0,20).map((coin, index) => (
              <li key={index}>
                {coin.name}
              </li>
            ))}
            </ul>
        </div>
      </header>
    </div>
  );
}

export default Portfolio;

import React, {useState, useEffect} from 'react';
import { useAuth } from "./Context/AuthContext"
import {database} from "./firebase"
import Chart from "./components/PortfolioChart"

function Portfolio() {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const [coinHistory, setCoinHistory] = useState({})
  // const [colors, setColors] = useState([])

  function historyFinder() {
    let historyArr = []

    for (var i = 0; i < coins.length; i++){
      // console.log(coins.indexOf([i]))
      // for(var x =0; x < 160; x++){
      //   if(coins.indexOf([i])){
      historyArr.push({
        index: i,
        name: coins.[i].name,
        hisotry: coins.[i].history})
      }
    setCoinHistory(historyArr)
    console.log(historyArr)
  }

  useEffect(() => {
    historyFinder()
  }, [coins]);

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
        <div className="row">
        <div style={{height:'430px'}}>
          {coins &&
            <Chart data={coins} className="chartContainer" />
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

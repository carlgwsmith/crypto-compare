import React, {useState, useEffect} from 'react';
import { useAuth } from "./Context/AuthContext"
import {database} from "./firebase"

function Portfolio() {

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [prevCoins, setPrevCoins] = useState([])
  const { currentUser } = useAuth()

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
          setPrevCoins(dataArray.[0].[1])
      }
  }
  )
  setLoading(false)
  console.log('success')
}

useEffect(() => {
  getCoins()
}, []);

  return (
    <div className="Results">
      <header className="App-header">
        <div className="row">
          <div className="col-sm-12">Portfolio</div>
          <ul>
          {prevCoins.slice(0,20).map((coin, index) => (
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

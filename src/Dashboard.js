import {useState, useEffect} from 'react'
import CoinSearch from './components/CoinSearch'
import Banner from './components/Banner'
import TopSlider from './components/TopSlider'
import { useAuth } from "./Context/AuthContext"
import {database} from "./firebase"

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const [coins, setCoins] = useState([])
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  let userName = ''


  useEffect(() => {
    setLoading(true)
    database.users.doc(currentUser.uid).get().then(
    doc => {
        let data = (doc.data());
        if(data === undefined){
            console.log('first timer')
        }else{
            const dataArray = Object.entries(data);
            console.log(dataArray)
            setCoins(dataArray.[0].[1])
        }
    }
    )
    setLoading(false)
    
    console.log(coins)
  }, []);

  
  if(currentUser){
    let userEmail= currentUser.email
    userName= userEmail.substr(0, userEmail.indexOf('@')); 
    } else {
      userName = ''
    }

  if(loading || !coins){
    return <h1>loading...</h1>;      
  }
  return (
    <div className="Dashboard">
      {/* <div className="row topCryptos">
      </div> */}
        <div className="row p-3">
          <div className="col-sm-12 mb-3"><TopSlider/></div>
          <div className="col-sm-12 pl-4">
            <h2>Welcome back, <span className="user">{userName}</span></h2>
            <p>you are currently researching {coins.length} coins.</p>
          </div>
          <div className="col-sm-12 mb-3"><CoinSearch/></div>
          <div className="col-sm-6"><Banner /></div>
        </div>
    </div>
  );
}

export default Dashboard;

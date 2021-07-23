import {useState, useEffect} from 'react'
import CoinSearch from './components/CoinSearch'
import Banner from './components/Banner'
import PortfolioNews from './components/PortfolioNews'
import TopSlider from './components/TopSlider'
import { useAuth } from "./Context/AuthContext"
import {database} from "./firebase"
import MarketDetailTable from "./components/MarketDetailTable"

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const [coins, setCoins] = useState([])
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
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
        <div className="col-sm-12 p-0 mx-4 mb-0 mt-2">
            <h2 className="pb-0 mb-1">Welcome back, <span className="user">{userName}</span></h2>
            <p className="subtitle mt-1 mb-0" style={{marginRight:"2.2rem;"}}>let's research some cypto.</p>
          </div>
          <div className="col-sm-12 mb-1 mt-3"><CoinSearch/></div>
          <div className="col-sm-12 mb-2"><TopSlider/></div>
        </div>
        <div className="row px-3 mx-1">
          <div className="col-sm-6 mx-0">
          <h4>Latest Market Details</h4>
          </div>
          <MarketDetailTable/>
        </div>
        <div className="row p-3 mx-1">
          <div className="col-sm-12 mx-0">
          <h4>Latest Crypto News</h4>
          </div>
          <PortfolioNews/>
        </div>
    </div>
  );
}

export default Dashboard;

import {useState, useEffect} from 'react'
import CoinSearch from './components/CoinSearch'
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
        <div className="col-sm-12 p-0 mx-4 mb-3 mt-2" style={{borderBottom: "1px solid #eaecfb"}}>
            <h2 className="pb-0 mb-1">Welcome back, <span className="user" style={{textTransform:"capitalize"}}>{userName}</span></h2>
            <p className="subtitle mt-1 mb-0 pb-3" style={{marginRight:"2.2rem;"}}>let's research some cypto.</p>
          </div>
        <div className="col-sm-12 mb-2"><TopSlider/></div>
          <div className="col-sm-12 mb-1 mt-3 p-2"><CoinSearch/></div>
        </div>
        <div className="row px-3 mx-1 mb-3 pt-3">
          <div className="col-sm-6 mx-0 px-0">
            <h3 style={{paddingLeft: "10px"}}>Latest Market Details</h3>
            <MarketDetailTable/>
          </div>
          <div className="col-sm-6 mx-0">
            <PortfolioNews/>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;

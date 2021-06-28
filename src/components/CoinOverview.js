import React, {useEffect, useState} from 'react';
import Chart from '../components/TinyChart'
import '../components/CSS/Overview.css'
import {Button} from 'react-bootstrap'
import {FaGlobeAmericas} from 'react-icons/fa'
import {RiAddCircleFill} from 'react-icons/ri'
import { useAuth } from "../Context/AuthContext"
import DetailTable from './DetailTable';
import SupplyChart from './SupplyChart';

const CoinOverview = (props) => {
    const [coin, setCoin] = useState({})
    const [error, setError] = useState(false)
    const [timeFrame, setTimeFrame] = useState('7d')
    const [coinHistory, setCoinHistory] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const { currentUser } = useAuth()

    const coinId = props.match.params.coinId

    useEffect(() => {
        fetch("https://coinranking1.p.rapidapi.com/coin/" + coinId, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
                "x-rapidapi-host": "coinranking1.p.rapidapi.com"
            }
        })
        .then(response => {
            if(response.ok){
            response.json().then((json) => {
                setCoin(json.data.coin)
                console.log(json.data.coin)
            })
            }
        })
        .catch(err => {
            setError('No Coins Yet')
        });
        }, []);
    
    
    useEffect(() => {
        fetch("https://coinranking1.p.rapidapi.com/coin/" + coinId + "/history/" + timeFrame, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
                "x-rapidapi-host": "coinranking1.p.rapidapi.com"
            }
        })
        .then(response => {
            if(response.ok){
            response.json().then((json) => {
                setCoinHistory(json.data.history)
                console.log(coinHistory)
            })
            }
        })
        .catch(err => {
            setError('No Coins Yet')
        });
        }, [timeFrame]);

        function changeTimeFrame(time, index){
            setTimeFrame(time)
            setActiveIndex(index)
        }

        function addToWallet(){
            console.log('added')
        }

    return (
        <div>
            <div className="row p-2 mx-4 mt-2 mb-3" style={{borderBottom: '2px solid #e3e3e3'}}>
                <div className="col-sm-6 pl-4">
                    <div className="coinDetails">
                        <div className="iconContainer"><img src={coin.iconUrl} className="coinIcon"></img></div>
                        <div className="nameContainer">{coin.name} ({coin.symbol})</div>
                    </div>
                </div>
                <div className="col-sm-6 pr-0 align-middle text-right">
                { !currentUser && 
                <>
                <a style={{fontSize: "15px"}} href={coin.websiteUrl} target="_blank"><FaGlobeAmericas size="2em" style={{marginTop: '20px', color: '#c3c3c3'}}/></a>
                </>
                }
                { currentUser &&
                <>
                <a style={{fontSize: "15px", marginRight: "10px"}} href={coin.websiteUrl}><FaGlobeAmericas size="2em" style={{marginTop: '20px', color: '#c3c3c3'}}/></a>
                <Button variant="success" onClick={addToWallet} className="addBtn">
                    <RiAddCircleFill style={{marginTop: '-2px'}}/> Add to Wallet
                </Button>
                </>
                }
                </div>
            </div>
            <div className="row px-2 mx-1">
                <div className="col-sm-12">
                <div>
                <span className="coinName">{coin.name} Pricing</span>
                <span className="timeButtons">
                        <button onClick={() => changeTimeFrame('7d', 0)} className={activeIndex === 0 ? "active timeBtn" : "timeBtn"}>7d</button>
                        <button onClick={() => changeTimeFrame('30d', 1)} className={activeIndex === 1 ? "active timeBtn" : "timeBtn"}>30d</button>
                        <button onClick={() => changeTimeFrame('1y', 2)} className={activeIndex === 2 ? "active timeBtn" : "timeBtn"}>1y</button>
                        <button onClick={() => changeTimeFrame('5y', 3)} className={activeIndex === 3 ? "active timeBtn" : "timeBtn"}>5y</button>
                    </span>
                </div>
                    <div style={{height:'430px'}}>
                    <Chart data={coinHistory} className="chartContainer" color={coin.color} />
                    </div>
                </div>
            </div>
            <div className="row px-3 py-4">
                <div className="col-sm-6">
                <h3>{coin.name} Statistics</h3>
                    <DetailTable
                        supply={coin.totalSupply}
                        circulating={coin.circulatingSupply}
                        volume={coin.volume}
                        rank={coin.rank}
                        cap={coin.marketCap}
                        price={coin.price}
                        name={coin.name}/>
                </div>
                <div className="col-sm-6">
                    <h3>{coin.name} Supply</h3>
                    <div style={{height:'350px', marginTop:'20px'}}>
                    <SupplyChart
                    supply={coin.totalSupply}
                    circulating={coin.circulatingSupply}
                    />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoinOverview;

import React, {useEffect, useState} from 'react';
import Chart from '../components/TinyChart'
import '../components/CSS/Overview.css'

const CoinOverview = (props) => {
    const [coin, setCoin] = useState({})
    const [error, setError] = useState(false)
    const [timeFrame, setTimeFrame] = useState('7d')
    const [coinHistory, setCoinHistory] = useState([])
    const [activeBtn, setActiveBtn] = useState('')

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
                console.log(coin)
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

        function changeTimeFrame(time){
            setTimeFrame(time)
            setActiveBtn('active')
        }

    return (
        <div>
            <div className="row p-4">
                <div className="col-sm-12 p-4">
                    <h2>{coin.name} ({coin.symbol})</h2>
                </div>
                <div className="col-sm-12">
                <div style={{height:'450px'}}>
                <Chart data={coinHistory} className="chartContainer"/>
                </div>
                <div style={{textAlign:'center'}}>
            <button onClick={() => changeTimeFrame('7d')} className="timeBtn">7d</button>
            <button onClick={() => changeTimeFrame('30d')} className="timeBtn">30d</button>
            <button onClick={() => changeTimeFrame('1y')} className="timeBtn">1y</button>
            <button onClick={() => changeTimeFrame('5y')} className="timeBtn">5y</button>
            </div>
                </div>
            </div>
            coin overview
            {coin.id}
            {coin.price}
            
        </div>
    );
}

export default CoinOverview;

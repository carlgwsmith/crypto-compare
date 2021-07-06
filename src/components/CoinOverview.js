import React, {useEffect, useState} from 'react';
import Chart from '../components/TinyChart'
import '../components/CSS/Overview.css'
import {Button} from 'react-bootstrap'
import {FaGlobeAmericas, FaCheckCircle} from 'react-icons/fa'
import {RiAddCircleFill} from 'react-icons/ri'
import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
import { useAuth } from "../Context/AuthContext"
import {database} from "../firebase"
import DetailTable from './DetailTable';
import SupplyChart from './SupplyChart';
import NewsFeed from '../components/NewsFeed';
import styled, { keyframes } from "styled-components";

const CoinOverview = (props) => {
    const [coin, setCoin] = useState({})
    const [prevCoins, setPrevCoins] = useState([])
    const [error, setError] = useState(false)
    const [timeFrame, setTimeFrame] = useState('7d')
    const [coinHistory, setCoinHistory] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const { currentUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [news, setNews] = useState([])
    const [success, setSuccess] = useState(false)
    const [sending, setSending] = useState(false)
    const [disabled, setDisabled] = useState(false);
    const [added, setAdded] = useState(false)


    const coinId = props.match.params.coinId
    const coinName = props.match.params.coinName

    function changeTimeFrame(time, index){
        setTimeFrame(time)
        setActiveIndex(index)
    }
    
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

    function addCoinToList () {
        console.log(prevCoins)

         let coinToSubmit = {
             id: coin.uuid,
             name: coin.name,
             price: coin.price,
             symbol: coin.symbol,
             history: coin.history
         }

         if(prevCoins.filter(coinToSubmit => coinToSubmit.name === coin.name).length > 0){
             setAdded(true)
         }else{
            if (sending || disabled) {
                return;
              }
              setSending(true);
              setDisabled(true);
              setTimeout(() => {
                setSuccess(true);
                setSending(false);
                setTimeout(() => {
                  setSuccess(false);
                  setDisabled(false);
                }, 1500);
              }, 2000);
              setTimeout(() => {
                  setAdded(true)
              }, 3500);
              
         const submitArray = [...prevCoins, coinToSubmit];
         console.log(submitArray);
         database.users.doc(currentUser.uid).set({
             coins: submitArray})
        }
     }

    useEffect(() => {
        getCoins()
    }, []);

    useEffect(() => {
        if (prevCoins.filter(coinToSubmit => coinToSubmit.name === coin.name).length > 0){
            console.log('added already')
            setAdded(true)
        }
    }, [prevCoins]);

    useEffect(() => {
        setLoading(true)
        fetch("https://coinranking1.p.rapidapi.com/coin/" + coinId, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
                "x-rapidapi-host": "coinranking1.p.rapidapi.com"
            }
        })
        .then(response => {
            setLoading(true)
            if(response.ok){
            response.json().then((json) => {
                setCoin(json.data.coin)
                console.log(json.data.coin)
                setLoading(false)
            })
            }
        })
        .catch(err => {
            setError('No Coins Yet' + err)
        });
    }, []);

    useEffect(() => {
        fetch("https://free-news.p.rapidapi.com/v1/search?q=Crypto%20"+coinName+"&lang=en", {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
        "x-rapidapi-host": "free-news.p.rapidapi.com"
    }
    })
    .then(response => {
        if(response.ok){
            response.json().then((json) => {
                console.log(json.articles)
                setNews(json.articles)
            })
            }
    })
    .catch(err => {
        console.error(err);
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
            })
            }
        })
        .catch(err => {
            setError('No Coins Yet')
        });
    }, [timeFrame]);


    if(loading){
        return <h1>loading...</h1>;      
    }
    return (
        <div>
            <div className="row p-2 mx-4 mt-2 mb-3" style={{borderBottom: '2px solid #e3e3e3'}}>
                <div className="col-sm-6 pl-0">
                    <div className="coinDetails">
                        <div className="iconContainer"><img src={coin.iconUrl} className="coinIcon"></img></div>
                        <div className="nameContainer">{coin.name} ({coin.symbol})</div>
                    </div>
                </div>
                <div className="col-sm-6 pr-0 align-middle text-right">
                { !currentUser && !added && 
                <>
                <a style={{fontSize: "15px"}} href={coin.websiteUrl}><FaGlobeAmericas size="2em" style={{marginTop: '20px', color: '#c3c3c3'}}/></a>
                </>
                }
                { currentUser && !added &&
                <>
                <a style={{fontSize: "15px", marginRight: "10px"}} href={coin.websiteUrl}><FaGlobeAmericas size="2em" style={{color: '#c3c3c3'}}/></a>
                {/* <Button variant="success" onClick={addCoinToList} className="addBtn">
                    <RiAddCircleFill style={{marginTop: '-2px'}}/> Add to Wallet
                </Button> */}
                <StyledButton
                    type="button"
                    disabled={disabled}
                    onClick={addCoinToList}
                    className={`${success && "button-success"}`}
                >
                    {sending && (
                    <div>
                        <StyledSpiner /> Adding Coin
                    </div>
                    )}
                    {success && 
                    <>
                    <FaCheckCircle/> Success
                    </>
                    }
                    {added &&
                    <span>Already Added</span>
                    }
                    {!sending && !added && !success && <span><RiAddCircleFill style={{marginTop: '-2px'}}/> Add to Wallet</span>}
                </StyledButton>
                </>
                }
                { currentUser && added &&
                <>
                <a style={{fontSize: "15px", marginRight: "10px"}} href={coin.websiteUrl}><FaGlobeAmericas size="2em" style={{color: '#c3c3c3'}}/></a>
                <StyledButton
                    type="button"
                    disabled={disabled}
                    className={`${"button-disable"}`}
                >
                <span><RiAddCircleFill style={{marginTop: '-2px'}}/> Already Added</span>
                </StyledButton>
                </>
                }
                </div>
            </div>
            <div className="row px-2 mx-1">
                <div className="col-sm-12">
                <div>
                <span className="coinName">{'Current Price: $' + Number(coin.price).toFixed(2)}</span>
                { coin.change > 0 && 
                <>
                <div className="posChange"><MdTrendingUp/>{coin.change} %</div>
                </>
                }
                {
                 coin.change < 0 &&
                 <>
                 <div className="negChange"><MdTrendingDown/>{coin.change} %</div>
                 </>
                }
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
            <div className="row p-4">
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
            {news &&
            <div className="row p-3">
                <div className="col-sm-12">
                    <h3>{coin.name} News</h3>
                </div>
                <NewsFeed news={news}/>
            </div>
            }
        </div>
    );
}


const StyledButton = styled.button`
  border: none;
  min-height: 40px;
  min-width: 200px;
  margin-top:14px;
  padding: 0 24px;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  color: white;
  transition: width 500ms, background-color 120ms;
  overflow: hidden;
  background-color: #007aff;
  &.button-success {
    background-color: #28cd41;
  }
  &.button-success:hover{
    background-color:#28cd41;
  }
  &.button-disable{
    background-color:#e4e4e4;
    color:#444
  }
  &.button-disable:focus, &.button-disable:hover{
      background-color: #d6d6d6 !important;
      color:444;
  }
  &:focus {
    outline: none;
  }
  &,
  &:active,
  &:hover,
  &:focus {
    background-color: #007aff;
  }
`;

const spin = keyframes`
  0% {
      transform: rotate(0deg);
  }

  100% {
      transform: rotate(360deg);
  }`;

const StyledSpiner = styled.span`
  display: inline-block;
  margin: 0 8px;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  border: 0.215em solid transparent;
  vertical-align: middle;
  font-size: 10px;
  border-top-color: white;
  animation: ${spin} .5s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite;
`;


export default CoinOverview;

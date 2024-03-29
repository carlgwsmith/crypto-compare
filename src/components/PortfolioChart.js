import React, {useEffect, useState} from "react";
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,Legend, ResponsiveContainer} from "recharts";
import moment from 'moment'
import numeral from 'numeral'

const data1 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default function PortfolioChart(props) {
const [data, setData] = useState([])
const [coins, setCoins] = useState({})
const [loading, setLoading] = useState(false)
const [timeFrame, setTimeFrame] = useState('')
const [fetchUrl, setFetchUrl] = useState([])

useEffect(() => {

setData([])
setTimeFrame(props.timeFrame)
getHis()
}, [props.timeFrame]);

function getHis(){
  setLoading(true)
  for (let i = 0; i < props.data.length; i++){
    fetch("https://api.coinranking.com/v2/coin/"+props.data.[i].id+"/history/" + props.timeFrame, {
"method": "GET",
"headers": {
  "x-access-token": process.env.REACT_APP_COINRANKING_API_KEY
  }
}).then(response => {
  if(response.ok){
  response.json().then((json) => {
    setData(data => [...data,
      {
        id: props.data.[i].id,
        name: props.data.[i].name,
        history: json.data.history,
        color:props.data.[i].color
      }
    ])
  })
  }
})
  }
  setLoading(false)
}

useEffect(() => {
  setData([])
setTimeFrame(props.timeFrame)
getHis()
}, [props.data]);


const currencyFormatter = (item) => numeral(item).format('$0,0')
if (loading){
  return <h1 className="text-center pt-5">Loading Chart..</h1>
}
  return (
    <ResponsiveContainer width="100%" height="100%">
      
    <AreaChart
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" verticalFill={['#f6f8ff', '#eef1f7']} />
      <XAxis dataKey="timestamp" tickFormatter={(unixTime) => moment(unixTime).format('MM/DD/YYYY')} allowDuplicatedCategory={false}/>
      <YAxis tickFormatter= {currencyFormatter} dataKey="price" type="number" domain={[0, 'auto']} allowDataOverflow={false}/>
      <Tooltip labelFormatter={t => new Date(t).toLocaleString()}/>
      <Legend />
      {
      data.map((i) => {
        return (<Area data={i.history} dataKey="price" name={i.name} stroke={i.color} dot={false} strokeWidth={2} fillOpacity={0} fill={i.color} isAnimationActive={true}/>)
      }
    )
  }
    </AreaChart>
    </ResponsiveContainer>
  );
}

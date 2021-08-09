import React, {useEffect, useState} from "react";
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,Legend, ResponsiveContainer} from "recharts";
import moment from 'moment'
import numeral from 'numeral'

export default function PortfolioChart(props) {
const [data, setData] = useState([])
// const [coins, setCoins] = useState({})
const [loading, setLoading] = useState(false)
const [timeFrame, setTimeFrame] = useState('')
// const [fetchUrl, setFetchUrl] = useState([])

useEffect(() => {

setData([])
setTimeFrame(props.timeFrame)
getHis()
}, [props.timeFrame]);

function getHis(){
  setLoading(true)
  for (let i = 0; i < props.data.length; i++){
    fetch("https://coinranking1.p.rapidapi.com/coin/"+props.data.[i].id+"/history/" + props.timeFrame, {
"method": "GET",
"headers": {
  "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  "x-rapidapi-host": "coinranking1.p.rapidapi.com"
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

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
//const [history, setHistory] =useState([])

// function historyFinder (){
//   let historyArray=[];
//   for(let i = 0; i < data.length; i++){
//     historyArray.push(data.[i].history);
//   }
//   setHistory(historyArray)
// }
useEffect(() => {
  //setHistory(props.data)
}, []);

useEffect(() => {
  setData(props.data)
  setTimeout(() => {
    console.log(data)
  }, 1500);
}, [props.data]);

const currencyFormatter = (item) => numeral(item).format('$0,0')

  return (
    <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" tickFormatter={(unixTime) => moment(unixTime).format('MM/DD/YYYY')} allowDuplicatedCategory={false}/>
      <YAxis tickFormatter= {currencyFormatter} dataKey="price" type="number" domain={[0, 'auto']} allowDataOverflow={false}/>
      <Tooltip labelFormatter={t => new Date(t).toLocaleString()}/>
      <Legend />
      {
      data.map((i) => {
        return (<Area data={i.history} dataKey="price" name={i.name} stroke={i.color} dot={false} strokeWidth={2} fillOpacity={.4} fill={i.color}/>)
      // if(i.color == null){
      //   return (<Line data={i.history} dataKey="price" name={i.name} stroke="#14ce71" dot={false} strokeWidth={2}/>)
      //   } else {
      //     return (<Line data={i.history} dataKey="price" name={i.name} stroke={i.color} dot={false} strokeWidth={2}/>)
      //   }
      }
    )
  }
    </AreaChart>
    </ResponsiveContainer>
  );
}

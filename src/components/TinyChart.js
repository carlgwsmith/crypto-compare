import React, {useEffect, useState} from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment'
import CoinOverview from './CoinOverview';

function TinyChart (props) {
  const [data, setData] = useState([]);

  function timeConverter(UNIX_timestamp){
    var trim = UNIX_timestamp.substring(0,10);
    var a = new Date(trim * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
  
  const coinColor = props.color

  console.log('color' + coinColor)
  
  useEffect(() => {
    setData(props.data)
    console.log(props.data)
  }, [props.data]);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={coinColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor='#ffffff' stopOpacity={0.4}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" tickFormatter = {(unixTime) => moment(unixTime).format('MM/DD/YYYY')}/>
          <XAxis />
          <YAxis />
          <Tooltip labelFormatter={t => new Date(t).toLocaleString()}/>
          <Legend />
          <Area type="monotone" dataKey="price" stroke={coinColor} name="Price ($)" dot={false} strokeWidth={2} fillOpacity={1} fill="url(#colorUv)"/>
        </AreaChart>
      </ResponsiveContainer>
    )
}
export default TinyChart
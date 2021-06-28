import React, {useEffect, useState} from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment'
import numeral from 'numeral'

function TinyChart (props) {
  const [data, setData] = useState([]);
  const [coinColor, setCoinColor] = useState('');

  const currencyFormatter = (item) => numeral(item).format('$0,0')

  console.log('color' + coinColor)
  
  useEffect(() => {
    setData(props.data)
    console.log(props.data)
    if (props.color){
      setCoinColor(props.color)
    }else(
      setCoinColor('#14ce71')
    )
  }, [props.data]);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left:-35,
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
          <YAxis tickFormatter= {currencyFormatter} domain={[0, 'auto']}/>
          <Tooltip labelFormatter={t => new Date(t).toLocaleString()}/>
          <Legend />
          <Area type="monotone" dataKey="price" stroke={coinColor} name="Price ($)" dot={false} strokeWidth={2} fillOpacity={1} fill="url(#colorUv)"/>
        </AreaChart>
      </ResponsiveContainer>
    )
}
export default TinyChart
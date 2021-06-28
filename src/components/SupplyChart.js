import React, {useEffect, useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';
function SupplyChart (props) {
  const [data, setData] = useState([]);



  useEffect(() => {
    setData([
      {
        Name: 'Circulating Supply',
        Circulating: props.circulating,
        Total: props.supply}
    ])
  }, [props]);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
        barCategoryGap='10%'
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" name="Supply"/>
          <YAxis domain={[0, 'maxData']}/>
          <Tooltip/>
          <Legend/>
          <Bar type="monotone" dataKey="Circulating" barSize={120} fill="#ff6565"/>
          <Bar type="monotone" dataKey="Total" barSize={120} fill="#47ea84"/>
        </BarChart>
      </ResponsiveContainer>
    )
}
export default SupplyChart
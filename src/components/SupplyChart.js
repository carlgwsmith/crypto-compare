import React, {useEffect, useState} from 'react';
import { Pie, PieChart, Sector, Cell, ResponsiveContainer } from 'recharts';
function SupplyChart (props) {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };


  useEffect(() => {
    setData([
      {
        name: 'Circulating Supply',
        value: props.circulating
      },
      {
        name: 'Total Supply',
        value: props.supply
      }
    ])
  }, [props]);

  const COLORS = ["#0088FE", "#00C49F"]

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart
        //barCategoryGap='10%'
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <XAxis dataKey="name" name="Supply"/>
          <YAxis domain={[0, 'maxData']}/> */}
          <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          dataKey="value"
          outerRadius={120}
          innerRadius={110}
          startAngle={180}
          endAngle={-270}
          onMouseEnter={onPieEnter}
          >
            {data.map((point, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
           </Pie>
        </PieChart>
      </ResponsiveContainer>
    )
}
export default SupplyChart
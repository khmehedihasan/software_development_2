import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import url from '../../url';

const COLORS = ['#0088FE', '#ff0000', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PReportPi(){
  const [data, setData] = useState([]);

  useEffect(()=>{

    fetch(`${url}/report/purchase/totalReceived`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{

      setData((prev)=> [...prev,{name:"Payed",value: data[0].total}]);
      
      fetch(`${url}/report/purchase/totalDue`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
        setData((prev)=> [...prev,{name:"Due",value: data[0].total}]);
       });

     });


    return () => setData([]);
  
  },[]);


    return (
      <ResponsiveContainer >
        <PieChart >
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
            <Tooltip />
        </PieChart>

      </ResponsiveContainer>
    );
  }

  export default PReportPi;
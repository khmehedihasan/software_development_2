import React, { useEffect, useState } from 'react' ;
import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import url from '../../url';



function Home(){

  const [data, setData] = useState([])

  useEffect(()=>{
    fetch(`${url}/product`,{credentials: 'include'}).then((data)=>data.json()).then((data)=>{
        setData(data.data);
    });
  },[]);

  
  class CustomizedLabel extends PureComponent {
    render() {
      const { x, y, stroke, value } = this.props;
      return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
          {value}
        </text>
      );
    }
  }
  
  class CustomizedAxisTick extends PureComponent {
    render() {
      const { x, y, payload } = this.props;
  
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
            {payload.value}
          </text>
        </g>
      );
    }
  }
      

  return(
      <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} padding={{ left: 30, right: 30 }} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="purchaseQuantity" stroke="#8184d8" label={<CustomizedLabel />} />
        <Line type="monotone" dataKey="saleQuantity" stroke="#82ca9d" label={<CustomizedLabel />} />
        <Line type="monotone" dataKey="inStock" stroke="#ff3300" label={<CustomizedLabel />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Home;
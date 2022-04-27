import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import token from '../../helpers/getToken';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);



export default function PolarAreaChart() {

  const [typePay, setTypePay] = useState([]);

  const data = {
    labels: typePay.map(row => row.NAM_TYPE_PAY),
    datasets: [
      {
        label: '# of Votes',
        data: typePay.map(row => row.NUM),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect( () =>{
    axios.get('/type-pay', token())
    .then(res => {
      setTypePay(res.data)
    })
  }, [])

  return <PolarArea data={data} />;
}

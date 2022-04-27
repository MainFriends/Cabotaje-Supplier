import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import token from '../../helpers/getToken';

ChartJS.register(ArcElement, Tooltip, Legend);




export default function DoughnutChartDecrease() {

  const [decrease, setDecrease] = useState([]);

  const data = {
    labels: decrease.map(row => row.NAM_PRODUCT),
    datasets: [
      {
        label: '# of Votes',
        data: decrease.map(row => row.TOT_PRODUCTS),
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
    axios.get('/decrease-graphics', token())
    .then(res => {
      setDecrease(res.data)
    })
  }, [])
    
  return <Doughnut data={data} />;
}
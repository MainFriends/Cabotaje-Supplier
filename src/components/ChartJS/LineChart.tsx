import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Cabotaje Supplier',
    },
  },
};


export default function App() {

  const [salesDay, setSalesDay] = useState([]);

 const data = {
  labels: salesDay.map(row => moment(row.DAT_INVOICE).format('DD-MM-YYYY')),
  datasets: [
    {
      label: 'Ventas',
      data: salesDay.map(row => row.TOT_DAY),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },

  ],
};

useEffect( () =>{
  axios.get('/tot-sales-day', token())
  .then(res => {
    setSalesDay(res.data)
  })
}, [])


  return <Line options={options} data={data} />;
}

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import token from '../../helpers/getToken';
import moment from 'moment';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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



export default function VerticalBarChart() {

  const [purchaseDay, setPurchaseDay] = useState([]);

  const data = {
    labels: purchaseDay.map(row => moment(row.DAT_INVOICE).format('DD-MM-YYYY')),
    datasets: [
      {
        label: 'Compras',
        data: purchaseDay.map(row => row.TOT_PURS_DAY),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect( () =>{
    axios.get('/purchase-per-week', token())
    .then(res => {
      setPurchaseDay(res.data)
    })
  }, [])

  return <Bar options={options} data={data} />;
}

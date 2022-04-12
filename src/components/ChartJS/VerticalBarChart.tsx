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
      text: 'Chart.js Bar Chart',
    },
  },
};


const max = 1000;
const min = 0;

const labels = ['Abril'];

export default function VerticalBarChart() {

  const [sales, setSales] = useState({});

  useEffect(() => {
    axios.get('/sale-invoice', token)
      .then(res => {
        const {data} = res;
        const ventas = data.map(venta => venta.TOT_SALE)
        const maxVentas = ventas.reduce((prev, current) => prev + current, 0)
        setSales({
          Abril: maxVentas
        })
      })
  }, [])

    const data = {
    labels,
    datasets: [
      {
        label: 'Ventas',
        data: [sales.Abril],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return <Bar options={options} data={data} />;
}

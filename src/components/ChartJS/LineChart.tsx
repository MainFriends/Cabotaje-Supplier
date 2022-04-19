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
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export default function App() {

    const [productos, setProductos] = useState([]);

 const data = {
  labels,
  datasets: [
    {
      label: 'Queso',
      data: productos.map(row => row.TOT_PRODUCTS),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Mantequilla',
      data: productos.map(row => row.TOT_PRODUCTS),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

useEffect( () =>{
    axios.get('/sales-products', token())
    .then(res => {
      setProductos(res.data)
    })
  }, [])


  return <Line options={options} data={data} />;
}

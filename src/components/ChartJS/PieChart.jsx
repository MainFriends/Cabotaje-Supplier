import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import token from '../../helpers/getToken';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChart() {

  const [roles, setRoles] = useState({});

  const data = {
    labels: ['Administrador', 'Control de Calidad', 'Contador', 'Cajero'],
    datasets: [
      {
        label: '# of Votes',
        data: [roles.administrador, roles.controlCalidad, roles.contador, roles.cajero],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    axios.get('/roles', token)
      .then(res => {
        setRoles({
          administrador: res.data.filter(row => row.COD_ROLE === 1).length,
          controlCalidad: res.data.filter(row => row.COD_ROLE === 2).length,
          contador: res.data.filter(row => row.COD_ROLE === 3).length,
          cajero: res.data.filter(row => row.COD_ROLE === 4).length
        })
      })
  }, [])

  return <Pie data={data} />;
}

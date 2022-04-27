import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from '../../config/axios';
import token from '../../helpers/getToken';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChart() {

  const [roles, setRoles] = useState([]);

  const data = {
    labels: roles.map(nombre => nombre.NAM_ROLE),
    datasets: [
      {
        label: '# of Votes',
        data: roles.map(cant => cant.CANT),
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
    axios.get('/roles-graphics', token())
      .then(res => {
        setRoles(res.data)
      })
  }, [])

  return <Pie data={data} />;
}


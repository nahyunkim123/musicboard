'use client';
import { Bar } from 'react-chartjs-2';
import Chart, { registerables, BarElement, CategoryScale, LinearScale } from 'chart.js/auto';
import { useEffect } from 'react';

export default function ChartCom() {
  useEffect(() => {
    Chart.register(...registerables, BarElement, CategoryScale, LinearScale);
  }, []);
  const data = {
    labels: ['신규 가입자 수', '신규 글 수', '신규 댓글 수'],
    datasets: [
      {
        label: '',
        data: [10, 50, 5],
        backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(255,159,64,0.2)', 'rgba(255,205,86,0.2)'],
        borderColor: ['rgb(255,99,132)', 'rgb(255,159,64)', 'rgb(255,205,86)'],
        borderWidth: 1,
      },
    ],
  };

  const AgeData = {
    labels: ['0', '10', '20', '30', '40', '50~'],
    datasets: [
      {
        label: '',
        data: [0, 3, 5, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(255,99,132,0.2)',
          'rgba(255,159,64,0.2)',
          'rgba(255,205,86,0.2)',
          'rgba(255,205,86,0.2)',
          'rgba(255,205,86,0.2)',
          'rgba(255,205,86,0.2)',
        ],
        borderColor: [
          'rgb(255,99,132)',
          'rgb(255,159,64)',
          'rgb(255,205,86)',
          'rgb(255,205,86)',
          'rgb(255,205,86)',
          'rgb(255,205,86)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="">
        <h3>전체 통계</h3>
        <Bar width={400} height={200} data={data} options={options} />
        <h3>연령별 통계</h3>
        <Bar width={400} height={200} data={AgeData} options={options} />
      </div>
    </>
  );
}

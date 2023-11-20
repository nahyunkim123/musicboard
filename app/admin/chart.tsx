'use client'
import {Bar} from 'react-chartjs-2'
import Chart, {registerables, BarElement,CategoryScale, LinearScale} from 'chart.js/auto'
import { useEffect } from 'react';



export default function ChartComponent() {
   
    useEffect(()=>{
        Chart.register(...registerables, BarElement, CategoryScale, LinearScale);
    },[])  
        
        const data = {
            labels : ['이용자 수' ,'orange', 'blue'],
            datasets :[
                {
                    label : "차트",
                    data : [30,50,5],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(54, 162, 235)',
                     
                      ],
                     borderWidth: 1
                }
            ]
        }
        const options = {
            animation:{
                duration:1000
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
  
   
    return(
        <div className='w-full'>
            <Bar data={data} options={options}/>
        </div>
    )
    
};

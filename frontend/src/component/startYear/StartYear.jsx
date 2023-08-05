import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import '../startYear/startYear.css'
import { DataContext } from "../../context/DataProvider";

const StartYear = () => {
  const {filterData}=useContext(DataContext)

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [],
        title:{
          text:'Value of start_year'
        }
      },
      yaxis:{
        title:{
          text:'How many times came'
        }
      }
    },
    series: [
      {
        name: "series-1",
        data: []
      }
    ]
  });

  useEffect(()=>{
    
     let yearCount={}
      for(let i=0;i<filterData.length;i++){
        const year = filterData[i].start_year;
        if(year in yearCount){
          yearCount[year]++
        }else{
          yearCount[year]=1
        }
      }
      
    delete yearCount['null']
    const sortedKeys = Object.keys(yearCount);
    const sortedValues = Object.values(yearCount);

    setChartData({
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: sortedKeys
        }
      },
      series: [
        {
          name: "series-1",
          data: sortedValues
        }
      ]
    })

  },[filterData])
  


  return (
    <div className="startYear">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default StartYear;

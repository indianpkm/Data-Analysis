import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts"
import '../endYear/endYear.css'
import { DataContext } from "../../context/DataProvider";

const EndYear = () => {
  const {filterData}=useContext(DataContext)
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [],
        title: {
          text: 'End Year',
          style: {
            fontSize: '1rem',
          },
      },
    },
    yaxis: {
      title: {
        text: 'How many times came',
        style: {
          fontSize: '.7rem',
        },
      },
    },
  },
    series: [
      {
        name: "series-1",
        data: []
      }
    ]
  });
  
  useEffect(()=>{
    
     let count={}

     for (const item of filterData) {
      const year = item.end_year;
      count[year] = (count[year] || 0) + 1;
    }
      
    const sortedCount = Object.entries(count).sort((a, b) => a[0] - b[0]);
    const sortedCountJson = Object.fromEntries(sortedCount);
    delete sortedCountJson['null']
    const sortedKeys = Object.keys(sortedCountJson);
    const sortedValues = Object.values(sortedCountJson);

    setChartData((prevChartData)=>({
      options: {
        ...prevChartData.options,
        xaxis: {
          ...prevChartData.options.xaxis,
          categories: sortedKeys,
        },
      },
      series: [
        {
          ...prevChartData.series[0],
          data: sortedValues
        }
      ]
    }))

  },[filterData])
  


  return (
    <div className="endYear">
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

export default EndYear;

import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import '../region/region.css'
import { DataContext } from "../../context/DataProvider";

const Region = () => {
  const {filterData}=useContext(DataContext)

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: "series-1",
        data: []
      }
    ]
  });

  useEffect(() => {
    const count = filterData.reduce((acc, data) => {
      const region = data.region;
      if (region) {
        acc[region] = (acc[region] || 0) + 1;
      }
      return acc;
    }, {});

    const sortedCount = Object.entries(count).sort((a, b) => a[1] - b[1]);
    const sortedKeys = sortedCount.map(([key]) => key);
    const sortedValues = sortedCount.map(([, value]) => value);

    setChartData({
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: sortedKeys,
          title:{
            text:'Region',
            style:{
              fontSize:'1rem'
            }
          }
        },
        yaxis:{
          title:{
            text:'How many times came',
            style:{
              fontSize:'.6rem'
            }
          }
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
    <div className="region">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default Region;

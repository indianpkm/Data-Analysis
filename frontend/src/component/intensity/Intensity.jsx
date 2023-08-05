import React, { useContext, useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import '../intensity/intensityStyle.css'
import { DataContext } from "../../context/DataProvider";

const Intensity = () => {
  const { filterData } = useContext(DataContext)

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 24, 30, 32, 36, 40, 48, 60, 72, 96],
        title: {
          text: 'Value Of',
          style: {
            fontSize: '1rem'
          }
        },
      },
      yaxis: {
        title: {
          text: 'How many times came',
          style: {
            fontSize: '.7rem',
          }
        }
      }
    },
    series: [
      {
        name: "Intensity",
        data: []
      },
      {
        name: "Relevance",
        data: []
      },
      {
        name: "Likelihood",
        data: []
      }
    ]
  });

  const memorizedChartData = useMemo(() => {

    let intensityCount = {}
    let relevanceCount = {}
    let likelihoodCount = {}


    for (const item of filterData) {
      const { intensity, relevance, likelihood } = item;

      intensityCount[intensity] = (intensityCount[intensity] || 0) + 1;
      relevanceCount[relevance] = (relevanceCount[relevance] || 0) + 1;
      likelihoodCount[likelihood] = (likelihoodCount[likelihood] || 0) + 1;
    }

    delete intensityCount['null']
    const intensityValues = Object.values(intensityCount);
    intensityValues.splice(4, 0, null)
    intensityValues.splice(6, 0, null)

    delete relevanceCount['null']
    const relvValues = Object.values(relevanceCount);

    delete likelihoodCount['null']
    const likeliValues = Object.values(likelihoodCount);

    return {
      options:chartData.options,
      series:[
        { name: "Intensity", data: intensityValues },
        { name: "Relevance", data: relvValues },
        { name: "Likelihood", data: likeliValues },
      ]
    }

  }, [filterData])

  useEffect(()=>{
    setChartData(memorizedChartData)
  },[memorizedChartData])

  return (
    <div className="intensity">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default Intensity;

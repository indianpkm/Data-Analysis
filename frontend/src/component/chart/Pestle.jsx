import React, { useContext } from 'react';
import Chart from 'react-apexcharts';
import '../chart/pestle.css'
import { DataContext } from '../../context/DataProvider';

const Pestle = () => {
  const { filterData } = useContext(DataContext)

  let pestleCount = {}
  for (let i = 0; i < filterData.length; i++) {
    const Pestle = filterData[i].pestle;
    if (Pestle in pestleCount) {
      pestleCount[Pestle]++
    } else {
      pestleCount[Pestle] = 1
    }
  }

  const sortedCount = Object.entries(pestleCount).sort((a, b) => a[1] - b[1]);
  const sortedCountJson = Object.fromEntries(sortedCount);
  delete sortedCountJson['']
  const sortedKeys = Object.keys(sortedCountJson);
  const sortedValues = Object.values(sortedCountJson);
  sortedKeys.reverse()
  sortedValues.reverse()

  const chartOptions={
    labels: sortedKeys,
    title: {
      text: "Pestle",
      offsetY: 10,
      offsetX: 230,
      style: {
        fontSize: "25px",
        fontWeight: "bold",
        color: "#263238",

      }
    }
  }

  // Adjust the title position for mobile view
const isMobileView = window.innerWidth <= 800; // Change 800 to any other desired breakpoint
if (isMobileView) {
  chartOptions.title.offsetX = 10;
  chartOptions.title.align = 'center';
  chartOptions.title.style.fontSize='17px'
}

  return (
    <div className="pestle">
      <Chart options={chartOptions} series={sortedValues} type="donut" width="100%" />
    </div>
  );
};

export default Pestle;

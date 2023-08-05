import React, { useContext } from 'react';
import Chart from 'react-apexcharts';
import '../chart/sector.css'
import { DataContext } from '../../context/DataProvider';

const Sector = () => {
  const {filterData}=useContext(DataContext)

  let count={}
  for(let i=0;i<filterData.length;i++){
    const sector = filterData[i].sector;
    if(sector in count){
      count[sector]++
    }else{
      count[sector]=1
    }
  }
  
const sortedCount = Object.entries(count).sort((a, b) => a[1] - b[1]);
const sortedCountJson = Object.fromEntries(sortedCount);
delete sortedCountJson['']
const sortedKeys = Object.keys(sortedCountJson);
const sortedValues = Object.values(sortedCountJson);
sortedKeys.reverse()
sortedValues.reverse()

const chartOptions = {
  labels: sortedKeys,
  title: {
    text: 'Sector',
    offsetY: 20,
    offsetX: 380,
    style: {
      fontSize: '25px',
      fontWeight: 'bold',
      color: '#263238',
    },
  },
};

// Adjust the title position for mobile view
const isMobileView = window.innerWidth <= 800; // Change 800 to any other desired breakpoint
if (isMobileView) {
  chartOptions.title.offsetX = 10;
  chartOptions.title.align = 'center';
  chartOptions.title.style.fontSize='17px'
}


  return (
    <div className="sector">
      <Chart options={chartOptions} series={sortedValues} type="donut" width="100%" />
    </div>
  );
};

export default Sector;

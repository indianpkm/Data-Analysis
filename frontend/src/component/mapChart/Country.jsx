import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import '../mapChart/mapStyle.css'
import { DataContext } from "../../context/DataProvider";


const Country = () => {
  const { filterData } = useContext(DataContext)

  const [options, setOptions] = useState({
    title: {
      text: "Country with Number of Appearances",
      align: "center",
    },
    series: [
      {
        data: []
      },
    ],
    legend: {
      show: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
  });

  useEffect(() => {
    const countryCount = {};

    // Count the occurrences of each country
    for (const item of filterData) {
      const country = item.country;
      if (country) { // Only consider non-empty country values
        countryCount[country] = (countryCount[country] || 0) + 1;
      }
    }

    const countryData = Object.entries(countryCount).map(([name, value]) => ({
      name,
      value,
    }));

    setOptions({
      title: {
        text: "Country with number",
        align: "center",
      },
      series: [
        {
          data: countryData.map((item) => ({
            x: item.name,
            y: item.value,
          })),
        },
      ],
      legend: {
        show: false,
      },
      chart: {
        toolbar: {
          show: false,
        },
      },
    })
  }, [filterData])

  return (
    <div className="country">
      <Chart
        options={options}
        series={options.series}
        type="treemap"
        height="350"
      />
      <div style={{ width: '90%', alignSelf: 'center' }}>Country with number means how many times a country appeared in the data</div>
    </div>
  );
};

export default Country;

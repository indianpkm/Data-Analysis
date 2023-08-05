import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import '../mapChart/mapStyle.css'
import { DataContext } from "../../context/DataProvider";

const Topic = () => {
  const { filterData } = useContext(DataContext)

  const [options, setOptions] = useState({
    title: {
      text: "Topic with Number of Appearances",
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
    const topicCount = {};

    // Count the occurrences of each topic
    for (const item of filterData) {
      const topic = item.topic;
      if (topic) { // Only consider non-empty topic values
        topicCount[topic] = (topicCount[topic] || 0) + 1;
      }
    }

    const topicData = Object.entries(topicCount).map(([name, value]) => ({
      name,
      value,
    }));

    setOptions({
      title: {
        text: "Topic with number",
        align: "center",
      },
      series: [
        {
          data: topicData.map((item) => ({
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
    <div className="topic">
      <Chart
        options={options}
        series={options.series}
        type="treemap"
        height="380"
      />
      <p style={{ width: 'inherit' }}>Topic with number means how many times a topic appeared in the data</p>
    </div>
  );
};

export default Topic;

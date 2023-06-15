import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  Export,
} from "devextreme-react/chart";

const BarChart = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/orderfood/viewAllOrder")
      .then((res) => {
       // console.log(res.data)
        const counts = {};
        for (const item of res.data) {
          const foodId = item.food_id;
          if (counts[foodId]) {
            counts[foodId]++;
          } else {
            counts[foodId] = 1;
          }
        }
        const data = Object.entries(counts).map(([state, value]) => ({
          state,
          MostOrdered: value
        //   Dining: 0,
        //   Delivery: 0,
        }));
        setReportData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Chart
      id="chart"
      dataSource={reportData}
    >
      <CommonSeriesSettings
        argumentField="state"
        type="bar"
        hoverMode="allArgumentPoints"
        selectionMode="allArgumentPoints"
      />
      <Series
        argumentField="state"
        valueField="MostOrdered"
        name="Most Ordered"
        color="#01BC90"
      />
      <Export enabled={true} />
    </Chart>
  );
};

export default BarChart;
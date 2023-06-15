import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  Export,
} from "devextreme-react/chart";

const BarChart=()=>{
    const [reportData, setReportData] = useState([]);

    useEffect(()=>{
        function sd(){
            axios.get("http://localhost:8070/barInventory/")
            .then((res)=>{
                console.log(res)
                setReportData(res.data)
            })
        }
      sd(); 
    },[]);

    return(
        <Chart id="chart" dataSource={reportData}>

            <CommonSeriesSettings
                argumentField="state"
                type="bar"
                hoverMode="allArgumentPoints"
                selectionMode="allArgumentPoints"
            />

            <Series
                argumentField="state"
                valueField="qwe"
                name="Most Ordered"
                color="#01BC90"

            />

            <Export enabled={true} />
        </Chart>
    );
};

export default BarChart;
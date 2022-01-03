import { useEffect, useState, useCallback } from "react";
import * as React from "react";
import { fetchData, ChartDataUtil } from "./dataUtil";
import * as d3 from "d3";
import MenuFilters from "./components/MenuFilters";
import MenuCharts from "./components/MenuCharts";
import { NobelCharts } from "./components/NobelCharts";
import "./styles.module.css";
const _ = require("lodash");
const dataURL =
  "https://gist.githubusercontent.com/idatatalks/8612a9f89c444b82728473a545813789/raw/nobel_winners_cleaned.csv";

export const NobelApp = (props) => {
  const [{ data, isDataLoaded }, setData] = useState({
    data: null,
    isDataLoaded: false,
  });
  const [chart, setChart] = useState("WinnersByCountry");

  useEffect(() => {
    console.log("Data fetch start");
    fetchData(dataURL)
      .then((rawData) => {
        console.log("Data parse start, rawData:", rawData);
        rawData = d3.csvParse(rawData, d3.autoType);
        const data = new ChartDataUtil(rawData);
        setData({ data, isDataLoaded: true });
        console.log("Data parse end!");
      })
      .catch((error) => console.log("Data fetch failed due to => ", error));
    console.log("Data fetch end!");
  }, []);

  const handleFilterChange = useCallback(
    (filters) => {
      setData({ data: _.clone(data.filterData(filters)), isDataLoaded: true });
    },
    [data]
  );

  const handleMenuCharts = useCallback((newChart) => {
    console.log("Chart:", newChart, " is selected.");
    setChart(newChart);
  }, []);

  console.log("NobelApp rendering:", data, " active chart:", chart);

  if (!isDataLoaded) {
    return <h1>Loading data...... please be patient or try again!</h1>;
  }

  return (
    <>
      <MenuFilters data={data} onSetFilter={handleFilterChange} />
      <MenuCharts selection={chart} onSetSelection={handleMenuCharts} />
      <NobelCharts data={data.filteredData} selectedChart={chart} />
    </>
  );
};

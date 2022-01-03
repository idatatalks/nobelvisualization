import { Grid } from "@mui/material";
import { useMemo } from "react";
import WinnersByCountry from "./Charts/WinnersByCountry";
import WinnersByRadio from "./Charts/WinnersByRadio";
import WinnersByCategory from "./Charts/WinnersByCategory";
import WinnersByYear from "./Charts/WinnersByYear";
import WinnersByTable from "./Charts/WinnersByTable";

const buildScatter = (data) => {
  console.log("build ScatterChart:", data);
  return (
    <Grid item width={"100%"}>
      <WinnersByCategory data={data} />
    </Grid>
  );
};

const buildBarchartAndPieChart = (data) => {
  console.log("build barchart");
  return (
    <>
      <Grid
        item
        sx={{
          width: { xs: "100%", sm: "100%", md: "100%", lg: "75%", xl: "75%" },
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "75%",
            xl: "75%",
          },
        }}
      >
        <WinnersByCountry
          data={data}
          xDataKey={"countryId"}
          xDataType={"number"}
          barDataKey={"number"}
          barDataType={"number"}
          beginYear={data.year[0]}
          endYear={data.year[1]}
        />
      </Grid>
      <Grid
        item
        sx={{
          width: { xs: "100%", sm: "100%", md: "100%", lg: "25%", xl: "25%" },
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "25%",
            xl: "25%",
          },
        }}
      >
        <WinnersByRadio
          data={data}
          dataKey={"radio"}
          beginYear={data.year[0]}
          endYear={data.year[1]}
        ></WinnersByRadio>
      </Grid>
    </>
  );
};

const buildAreaChart = (data) => {
  console.log("build AreaChart");
  return (
    <Grid item width={"100%"}>
      <WinnersByYear data={data} />
    </Grid>
  );
};

const buildTableChart = (data) => {
  console.log("build buildTableChart");
  return (
    <Grid item width={"100%"}>
      <WinnersByTable data={data} />
    </Grid>
  );
};

export const NobelCharts = ({ data, selectedChart }) => {
  console.log("NobelCharts render:", data);
  const scatterData = useMemo(() => buildScatter(data), [data]);
  const barchartData = useMemo(() => buildBarchartAndPieChart(data), [data]);
  const areachartData = useMemo(() => buildAreaChart(data), [data]);
  const tablechartData = useMemo(() => buildTableChart(data), [data]);

  const buildNobelChart = () => {
    const chartList = {
      WinnersByCategory: scatterData,
      WinnersByCountry: barchartData,
      WinnersByYear: areachartData,
      WinnersByTable: tablechartData,
    };
    return chartList[selectedChart];
  };

  return (
    <Grid
      container
      direction="row"
      columnSpacing={2}
      rowSpacing={2}
      justifyContent="space-between"
      alignItems="center"
      wrap="wrap"
      marginTop={2}
    >
      {buildNobelChart()}
    </Grid>
  );
};

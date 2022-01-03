import { Grid } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { FilterSelect } from "./MenuFiltersItems/FilterSelect";
import { FilterSlide } from "./MenuFiltersItems/FilterSlide";

const MenuFilters = ({ data, onSetFilter }) => {
  console.log("Menu rendering");
  const commonConfig = {
    data,
    onSetFilter,
    sx: { width: "100%", maxWidth: "100%" },
  };
  const arrLenOfYear = data.options.years.length - 1;
  return (
    <Grid
      container
      direction="row"
      columnSpacing={2}
      rowSpacing={1}
      justifyContent="center"
      alignItems="center"
      wrap="wrap"
      mt={1}
    >
      <Grid item xs={8} sm={4} md={4} lg={2} xl={2}>
        <FilterSelect
          {...{
            ...commonConfig,
            label: "Category",
            options: data.options.categories,
            defaultOptions: data.filters.category,
          }}
        />
      </Grid>
      <Grid item xs={4} sm={2} md={2} lg={1} xl={1}>
        <FilterSelect
          {...{
            ...commonConfig,
            label: "Gender",
            options: data.options.genders,
            defaultOptions: data.filters.gender,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
        <FilterSelect
          {...{
            ...commonConfig,
            label: "Country",
            options: data.options.countries,
            defaultOptions: data.filters.country,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={10} md={10} lg={6} xl={6}>
        <FilterSlide
          {...{
            ...commonConfig,
            range: data.filters.year,
            min: data.options.years[0],
            max: data.options.years[arrLenOfYear],
          }}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(MenuFilters);

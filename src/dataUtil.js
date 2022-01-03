import * as d3 from "d3";

export const COLOR_TITLE = "#666";
export const COLOR_TOOLTIP_BACKGROUND = "#f7efd2";
export const COLOR_PALETTE = [
  "#0cc0aa",
  "#4787c9",
  "#fb0998",
  "#59a20c",
  "#7c08c5",
  "#e0c645",
  "#715cb6",
  "#ef972d",
  "#a57a6a",
  "#c6c0fe",
  "#ec9bfa",
  "#421674",
  "#b3e467",
  "#5c190c",
  "#55f17b",
  "#c25357",
  "#b9dcca",
  "#29403b",
  "#f4b8ab",
  "#6a8b7b",
];

export async function fetchData(url) {
  console.log("URL:", url);
  const data = await fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.text();
    })
    .catch((error) => {
      throw error;
    });
  console.log("Data fetch complete!");
  return data;
}

export class ChartDataUtil {
  constructor(data) {
    this._data = data;
    this._initOptions();
    this._initFilters();
    this.filterData();
  }

  get options() {
    return this._options;
  }

  get filters() {
    return this._filters;
  }

  get filteredData() {
    return this._filteredData;
  }
}

ChartDataUtil.prototype._initOptions = function () {
  this._options = {};
  this._options.countries = Array.from(
    d3.group(this._data, (d) => d.country).keys()
  ).sort();
  this._options.categories = Array.from(
    d3.group(this._data, (d) => d.category).keys()
  );
  this._options.years = Array.from(
    d3.group(this._data, (d) => d.year).keys()
  ).sort((a, b) => a - b);
  this._options.genders = ["Male", "Female"];
};

ChartDataUtil.prototype._initFilters = function () {
  const len = this._options.years.length - 1;
  this._filters = {};
  this._filters.category = [...this._options.categories];
  this._filters.gender = [...this._options.genders];
  this._filters.country = d3
    .rollups(
      this._data,
      (v) => v.length,
      (d) => d.country
    )
    .sort((d1, d2) => d3.descending(d1[1], d2[1]))
    .slice(0, 10)
    .map((d) => d[0])
    .concat(["China", "India"]);
  this._filters.year = [this._options.years[0], this._options.years[len]];
};

ChartDataUtil.prototype._buildChartData = function () {
  this._filteredData.winnersByCountry = d3
    .flatRollup(
      this._filteredData,
      (v) => v.length,
      (d) => d.country
    )
    .sort((a, b) => d3.descending(a[1], b[1]));

  this._filteredData.maxWinners = this._filteredData.winnersByCountry[0];
  this._filteredData.sumWinners = d3.sum(
    this._filteredData.winnersByCountry,
    ([k, v]) => v
  );
  this._filteredData.countryNum = this._filteredData.winnersByCountry.length;
  this._filteredData.year = this._filters.year;
  this._filteredData.categories = this._filters.category;
};

ChartDataUtil.prototype.filterData = function (filters = null) {
  if (filters) this._filters = filters;
  console.log("Before filter, filters:", filters);
  console.log("Before filter, data:", this);
  this._filteredData = this._data.filter(
    (d) =>
      d.year >= this._filters.year[0] &&
      d.year <= this._filters.year[1] &&
      this._filters.country.find(
        (item) => item.toLowerCase() == d.country.toLowerCase()
      ) &&
      this._filters.category.find(
        (item) => item.toLowerCase() == d.category.toLowerCase()
      ) &&
      this._filters.gender.find(
        (item) => item.toLowerCase() == d.gender.toLowerCase()
      )
  );

  this._buildChartData();
  console.log("After filter, data:", this);
  return this;
};

export const getNumByCountry = (filter) => {
  return filter.winnersByCountry.map((d, i) => ({
    country: d[0],
    number: d[1],
    countryId: i + 1,
  }));
};

export const getRadioByCountry = (data) => {
  let sum = data.reduce((sum, d) => sum + d.number, 0);
  data.forEach((d) => {
    d.radio = (d.number * 100) / sum;
    // d.radio = `${((d.number * 100) / sum).toFixed(0)}%`;
  });
  return data;
};

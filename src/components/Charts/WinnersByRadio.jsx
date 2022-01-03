import * as React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getNumByCountry,
  getRadioByCountry,
  COLOR_TOOLTIP_BACKGROUND,
  COLOR_TITLE,
  COLOR_PALETTE,
} from "../../dataUtil";

const RADIAN = Math.PI / 180;
const margins = {
  top: 30,
  right: 5,
  bottom: 100,
  left: 40,
};

const WinnersByRadio = ({ data, dataKey, beginYear, endYear }) => {
  console.log("WinnersByRadio render");
  const filteredData = filterDataByRadio(data, 5);
  console.log("WinnersByRadio - filtered pie data:", filteredData);
  return (
    <ResponsiveContainer
      width={"100%"}
      minWidth={240}
      height={600}
      minHeight={500}
    >
      <PieChart margin={margins}>
        <text
          x={150}
          y={30}
          fill={COLOR_TITLE}
          fontSize={20}
          textAnchor="middle"
        >
          Winners Percentage By Country
          <tspan x={120} y={50}>
            ({beginYear}~{endYear})
          </tspan>
        </text>
        <Pie
          data={filteredData}
          dataKey={dataKey}
          cx={120}
          cy={150}
          outerRadius={70}
          label={renderCustomizedLabel}
        >
          {filteredData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLOR_PALETTE[index % COLOR_PALETTE.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: COLOR_TOOLTIP_BACKGROUND,
            borderRadius: 10,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 10,
            paddingRight: 10,
          }}
          content={<CustomTooltip data={filteredData} />}
          allowEscapeViewBox={{ x: false, y: false }}
        />
        <Legend content={<CustomLegend data={filteredData} />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

const renderCustomizedLabel = (props) => {
  const { x, y, cx, cy, midAngle, innerRadius, outerRadius, percent, index } =
    props;
  console.log("Pie label:", props);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = (props) => {
  const { data, active, payload, label, contentStyle } = props;
  console.log("Pie tooltop:", props);

  if (active && payload && payload.length) {
    const index = payload[0].name;
    console.log("Pie index:", index);
    const { country, number, radio } = data[index];
    return (
      <div style={{ ...contentStyle, color: COLOR_TITLE }}>
        <p>{`Percentage: ${radio.toFixed(0)}%`}</p>
        <p>{`Number: ${number}`}</p>
        <p>{`Country: ${country}`}</p>
      </div>
    );
  }

  return null;
};

const CustomLegend = (props) => {
  const { data, payload } = props;
  console.log("WinnersByRadio legend:", props);
  return (
    <ul style={{ marginTop: 20 }}>
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{ color: COLOR_PALETTE[index % COLOR_PALETTE.length] }}
        >
          {data[entry.value].country}
        </li>
      ))}
    </ul>
  );
};

const filterDataByRadio = (data, minRadio) => {
  data = getNumByCountry(data);
  data = getRadioByCountry(data);

  let totalNum = data.reduce((acc, c) => acc + c.number, 0);
  let filteredData = data.filter((d) => d.radio >= minRadio);
  let othersRadio = 100 - filteredData.reduce((acc, c) => acc + c.radio, 0);
  let totalFilteredNum = filteredData.reduce((acc, c) => acc + c.number, 0);
  filteredData.push({
    country: "Others",
    countryId: filteredData.length + 1,
    number: totalNum - totalFilteredNum,
    radio: othersRadio,
  });
  return filteredData;
};

export default React.memo(WinnersByRadio);

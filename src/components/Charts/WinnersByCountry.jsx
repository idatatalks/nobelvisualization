import * as React from "react";
import {
  BarChart,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { getNumByCountry, COLOR_TITLE, COLOR_PALETTE } from "../../dataUtil";

const margins = {
  top: 80,
  right: 5,
  bottom: 100,
  left: 30,
};
const minXTickGap = 50;

export const WinnersByCountry = ({
  data,
  xDataKey,
  xDataType,
  barDataKey,
  barDataType,
  beginYear,
  endYear,
}) => {
  console.log("WinnersByCountry render");
  data = getNumByCountry(data);
  console.log("WinnersByCountry barchartData:", data);

  const minWidth = data.length * minXTickGap;
  console.log("WinnersByCountry minWidth:", minWidth);
  return (
    <>
      <ResponsiveContainer width={"100%"} minWidth={minWidth} height={600}>
        <BarChart data={data} margin={margins}>
          <XAxis
            dataKey={xDataKey}
            tick={<CustomizedAxisTick data={data} />}
            tickLine={false}
            axisLine={false}
            allowDataOverflow={false}
            interval={0}
            fontSize={20}
          />
          <YAxis hide={true} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            align="center"
            verticalAlign="middle"
            height={36}
            wrapperStyle={{ top: 3, paddingTop: 2, fontSize: 20 }}
          />
          <Bar
            name={`Nobel winners by country(${beginYear}~${endYear})`}
            dataKey={barDataKey}
            fill={COLOR_TITLE}
            legendType="square"
            interval={30}
          >
            <LabelList dataKey={barDataKey} position="top" />
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLOR_PALETTE[index % COLOR_PALETTE.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload, data, index } = props;
  console.log("Render AxisTick props:", props);
  console.log("Payload value:", data[payload.value - 1].country);

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dx={-5}
        dy={0}
        textAnchor="end"
        fill={COLOR_TITLE}
        transform="rotate(-90)"
      >
        {data[payload.value - 1].country}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  //Don't display tooltip, but remaining the animation effect of bar selection
  return null;
};

export default React.memo(WinnersByCountry);

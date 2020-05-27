import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ReactGa from "react-ga";
import { format } from "d3";

function commaSeperated(x) {
  if (x !== undefined || x !== 0) {
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  } else return x;
}

const StateBarPlot = ({
  stateName,
  type,
  bgColor,
  titleClass,
  data,
  date,
  daily,
  dailyDelta,
  sparkline,
  divideBy,
  stroke,
  color1,
  color2,
}) => {
  return (
    <div className="col">
      <section
        className="graphsection"
        style={{
          alignSelf: "center",
          backgroundColor: `${bgColor}`,
          borderRadius: "6px",
          marginTop: 10,
        }}
      >
        <h5
          className={titleClass}
          style={{
            paddingTop: "8px",
            marginBottom: "-80px",
            textAlign: "left",
            marginLeft: 10,
            fontSize: 16,
            textTransform: "uppercase",
          }}
        >
          {type}
          <h6 style={{ fontSize: "12px", color: `${color1}` }}>
            {date[date.length - 1]}
            <h6 style={{ fontSize: "8px" }}>
              <h5 style={{ fontSize: 14, color: `${color2}` }}>
                {commaSeperated(daily)}{" "}
                <span style={{ fontSize: 9 }}>
                  {dailyDelta[0] >= 0
                    ? `+${commaSeperated(Math.abs(dailyDelta))}`
                    : `-${commaSeperated(Math.abs(dailyDelta))}`}
                </span>
              </h5>
            </h6>
          </h6>
        </h5>

        <ResponsiveContainer width="100%" height="100%" aspect={2.6}>
          <BarChart
            data={data}
            margin={{
              top: 35,
              right: -30,
              left: 10,
              bottom: -12,
            }}
            syncId="barchart"
          >
            <XAxis
              dataKey="date"
              tick={{ stroke: `${stroke}`, strokeWidth: 0.2 }}
              style={{ fontSize: 8 }}
              tickSize={5}
              tickCount={8}
            />
            <YAxis
              domain={[
                Math.floor(Math.min(...sparkline) / divideBy) * divideBy,
                Math.ceil(Math.max(...sparkline) / divideBy) * divideBy,
              ]}
              orientation="right"
              tick={{ stroke: `${stroke}`, strokeWidth: 0.2 }}
              tickFormatter={format("~s")}
              tickSize={5}
              style={{ fontSize: 8 }}
              tickCount={6}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(255,255,255,0)",
                border: "none",
                borderRadius: "5px",
                fontSize: "8px",
                fontFamily: "notosans",
                textTransform: "uppercase",
                textAlign: "left",
                lineHeight: 0.8,
              }}
              active={true}
              cursor={{ fill: "transparent" }}
              position={{ x: 120, y: 16 }}
            />
            <Bar
              dataKey="stateid"
              name={type}
              fill={stroke}
              radius={[3, 3, 0, 0]}
              onClick={() => {
                ReactGa.event({
                  category: `Graph ${stateName} ${type}bar`,
                  action: `${stateName} ${type}bar hover`,
                });
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default StateBarPlot;
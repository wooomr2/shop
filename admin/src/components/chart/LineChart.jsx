import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis
} from "recharts";
import "./chart.css";

function Chart({ title, data }) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#5550bd" />
          <Line type="monotone" dataKey="user" stroke="#5550bd" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;

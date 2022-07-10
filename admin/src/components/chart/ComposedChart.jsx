import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./chart.css";

function Chart({ title, data }) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <ComposedChart width={730} height={250} data={data}>
          <XAxis dataKey="month" />
          {/* <YAxis /> */}
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#ff7300" />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          {/* <Area yAxisId="left" type="monotone" dataKey="매출" fill="#8884d8" stroke="#8884d8" /> */}
          <Bar yAxisId="left" dataKey="매출" barSize={30} fill="#413ea0" />
          <Line yAxisId="right" type="monotone" dataKey="판매량" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;

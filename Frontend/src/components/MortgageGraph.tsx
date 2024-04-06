import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface GraphDataItem {
  year: number;
  principalPaid: number;
  interestPaid: number;
  loanAmountRemaining: number;
}

interface MortgageChartProps {
  GraphData: GraphDataItem[];
}

const MortgageGraph: React.FC<MortgageChartProps> = ({ GraphData }) => {
  return (
    <LineChart
      width={600}
      height={300}
      data={GraphData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="year" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="principalPaid"
        stroke="blue"
        name="Principal Paid"
      />
      <Line
        type="monotone"
        dataKey="interestPaid"
        stroke="green"
        name="Interest Paid"
      />
      <Line
        type="monotone"
        dataKey="loanAmountRemaining"
        stroke="red"
        name="Loan/Mortgage Balance"
      />
    </LineChart>
  );
};

export default MortgageGraph;

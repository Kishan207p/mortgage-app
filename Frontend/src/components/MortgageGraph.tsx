import React, { useEffect, useRef } from "react";
import Chart, { ChartType, InteractionMode } from "chart.js";

interface MortgageGraphProps {
  data: {
    labels: string[];
    principalPaid: number[];
    interestPaid: number[];
    loanAmountPaid: number[];
  };
}

const MortgageGraph: React.FC<MortgageGraphProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (!ctx) return;

      const chartConfig: Chart.ChartConfiguration = {
        type: "line" as ChartType,
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Principal Paid",
              borderColor: "blue",
              data: data.principalPaid,
            },
            {
              label: "Interest Paid",
              borderColor: "green",
              data: data.interestPaid,
            },
            {
              label: "Loan/Mortgage Amount Paid",
              borderColor: "red",
              data: data.loanAmountPaid,
            },
          ],
        },
        options: {
          interaction: {
            mode: "index" as InteractionMode,
            intersect: false,
          },
          plugins: {
            tooltip: {
              mode: "index" as InteractionMode,
              intersect: false,
            },
          },
        },
      };

      new Chart(ctx, chartConfig);
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default MortgageGraph;

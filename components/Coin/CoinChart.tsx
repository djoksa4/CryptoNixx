import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { useRouter } from "next/router";

import { HistoricalChartData, ChartDays } from "../../config/types";
import classes from "./CoinChart.module.scss";
import ChartButtons from "../../components/Coin/ChartButtons";

const chartDays: ChartDays[] = [
  { label: "24 Hours", value: 1 },
  { label: "30 Days", value: 30 },
  { label: "3 Months", value: 90 },
  { label: "1 Year", value: 365 },
];

const CoinChart: React.FC<{
  historicalChartData: HistoricalChartData;
  currency: string | string[];
}> = (props) => {
  const router = useRouter();

  return (
    <div className={classes.coinChart}>
      <Line
        data={{
          labels: props.historicalChartData.prices.map((coin) => {
            let date = new Date(coin[0]);

            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${
                    date.getMinutes() < 10 ? "0" : ""
                  }${date.getMinutes()} PM`
                : `${date.getHours()}:${
                    date.getMinutes() < 10 ? "0" : ""
                  }${date.getMinutes()} AM`;

            return router.query.days === "1" ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              data: props.historicalChartData.prices.map((coin) => coin[1]),
              label: `Price (past ${router.query.days} Days) in ${props.currency}`,
              borderColor: "gold",
              backgroundColor: "gold",
            },
          ],
        }}
      />
      <ChartButtons chartDays={chartDays} />
    </div>
  );
};

export default CoinChart;

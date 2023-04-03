import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const HistoryChart = () => {
  const { coin } = useParams();
  const [coinData, setCoinData] = useState<any>([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7&interval=daily`
        );
        setCoinData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHistoryData();
  }, []);

  const coinChartData = coinData.prices?.map((value: any) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
  };

  const data = {
    labels: coinChartData?.map((value: any) =>
      moment(value.x).format('MMM DD')
    ),
    datasets: [
      {
        fill: true,
        label: coin,
        data: coinChartData?.map((val: any) => val.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

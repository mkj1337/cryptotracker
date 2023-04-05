// styles
import './HistoryChart.scss';

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
  Filler
);

interface HistoryChartProps {
  value: string;
}

export const HistoryChart = ({ value }: HistoryChartProps) => {
  const { coin } = useParams();
  const [coinData, setCoinData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHistoryData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${value}&interval=daily`
        );
        setCoinData(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    fetchHistoryData();
  }, [value]);

  const coinChartData = coinData.prices?.map((value: any) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const data: any = {
    labels: coinChartData?.map((value: any) =>
      moment(value.x).format('MMM DD HH')
    ),
    datasets: [
      {
        label: coin,
        data: coinChartData?.map((val: any) => val.y),
        borderColor: 'rgba(218,0,255,1)',
        backgroundColor: 'transparent',
        pointStyle: false,
        fill: {
          target: 'start',
          above: '#d900ff32', // Area will be red above the origin
        },
      },
    ],
  };

  const options: any = {
    plugins: {
      legeng: false,
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: '0px',
          },
        },
      },
      x: {
        grid: {
          borderDash: [6],
          border: false,
        },
        ticks: {
          font: {
            size: '1px',
          },
        },
      },
    },
  };

  if (isLoading) return <span className="history__chart">Loading...</span>;

  return (
    <div className="history__chart">
      <h1>{coin?.toUpperCase()}</h1>
      <Line data={data} options={options} />
    </div>
  );
};

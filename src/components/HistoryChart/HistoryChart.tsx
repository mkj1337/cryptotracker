import { SyncLoader } from 'react-spinners';
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
import { HistoryChartProps } from '../../interfaces';
import axios from 'axios';

// styles
import './HistoryChart.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

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
        borderColor: 'rgb(74, 64, 167)',
        backgroundColor: 'transparent',
        pointStyle: false,
        fill: {
          target: 'start',
          above: 'rgb(62, 52, 146)', // Area will be red above the origin
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
            size: '1px',
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

  return (
    <div className="history__chart">
      {isLoading ? (
        <div className="history__loader">
          <SyncLoader color="rgb(62, 52, 146)" />
        </div>
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
};

import { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import { coinDataProps, cryptosProps } from '../../interfaces';
import { HistoryChart } from '../../components/HistoryChart/HistoryChart';
import { useParams } from 'react-router-dom';
import { isPositive } from '../../utils';
import axios from 'axios';
import { FaReddit, FaLink } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// styles
import './SingleCoin.scss';
import { options } from '../../api';

export const SingleCoin = () => {
  const { coin } = useParams();
  const [value, setValue] = useState<string>('24h');
  const [coinData, setCoinData] = useState<cryptosProps>({} as cryptosProps);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCoinData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://openapiv1.coinstats.app/coins/${coin}`,
          options
        );
        setIsLoading(false);
        console.log(data);

        setCoinData(data);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    fetchCoinData();
  }, []);

  return (
    <section className="single__coin">
      <div className="single__wrapper">
        {isLoading ? (
          <SyncLoader color="rgb(62, 52, 146)" />
        ) : (
          <>
            <div className="single__chart">
              <HistoryChart value={value} />
              <div className="single__select">
                <div
                  className="single__option"
                  style={
                    value === '24h'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('24h')}
                >
                  24h
                </div>
                <div
                  className="single__option"
                  style={
                    value === '1w'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('1w')}
                >
                  7d
                </div>
                <div
                  className="single__option"
                  style={
                    value === '1m'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('1m')}
                >
                  30d
                </div>
                <div
                  className="single__option"
                  style={
                    value === '3m'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('3m')}
                >
                  90d
                </div>
                <div
                  className="single__option"
                  style={
                    value === '6m'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('6m')}
                >
                  180d
                </div>
                <div
                  className="single__option"
                  style={
                    value === '1y'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('1y')}
                >
                  1y
                </div>
                <div
                  className="single__option"
                  style={
                    value === 'all'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('all')}
                >
                  MAX
                </div>
              </div>
            </div>
            <div className="single__header">
              <div className="single__info">
                <img src={coinData?.icon} alt={coinData?.name} />
                <h1 className="single__name">{coinData?.name}</h1>
                <span className="single__rank">Rank: #{coinData?.rank}</span>
              </div>
              <div className="single__details">
                <div className="single__socials">
                  {coinData.redditUrl && (
                    <a href={coinData?.redditUrl} target="_blank">
                      <FaReddit />
                    </a>
                  )}
                  {coinData.twitterUrl && (
                    <a href={coinData?.twitterUrl} target="_blank">
                      <FaXTwitter />
                    </a>
                  )}
                  {coinData.websiteUrl && (
                    <a href={coinData?.websiteUrl} target="_blank">
                      <FaLink />
                    </a>
                  )}
                </div>
                <div className="single__bottom">
                  <span>
                    Price:
                    <span style={isPositive(Number(coinData?.priceChange1d))}>
                      {Number(coinData?.price).toFixed(2)}$
                    </span>
                  </span>
                  <span>
                    24h Change:
                    <span style={isPositive(Number(coinData?.priceChange1d))}>
                      {Number(coinData?.priceChange1d)?.toFixed(2)}%
                    </span>
                  </span>
                  <span>Symbol: {coinData?.symbol?.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

import './SingleCoin.scss';
import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { SyncLoader } from 'react-spinners';

// styles
import './SingleCoin.scss';
import { HistoryChart } from '../../components/HistoryChart/HistoryChart';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { isPositive } from '../../utils';

interface coinDataProps {
  name: string;
  image: {
    large: string;
  };
  description: {
    en: string;
  };
  market_data: {
    current_price: {
      usd: string | number;
    };
    price_change_percentage_24h: string | number;
  };
  symbol: string;
  coingecko_rank: string | number;
}

export const SingleCoin = () => {
  const { coin } = useParams();
  const [value, setValue] = useState<string>('1');
  const [coinData, setCoinData] = useState({} as coinDataProps);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCoinData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin}`
        );
        setIsLoading(false);
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
          <SyncLoader color='rgb(62, 52, 146)' />
        ) : (
          <>
            <div className="single__chart">
              <HistoryChart value={value} />
              <div className="single__select">
                <div
                  className="single__option"
                  style={
                    value === '1' ? { backgroundColor: 'rgb(62, 52, 146)' } : {}
                  }
                  onClick={() => setValue('1')}
                >
                  24h
                </div>
                <div
                  className="single__option"
                  style={
                    value === '7' ? { backgroundColor: 'rgb(62, 52, 146)' } : {}
                  }
                  onClick={() => setValue('7')}
                >
                  7d
                </div>
                <div
                  className="single__option"
                  style={
                    value === '14'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('14')}
                >
                  14d
                </div>
                <div
                  className="single__option"
                  style={
                    value === '30'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('30')}
                >
                  30d
                </div>
                <div
                  className="single__option"
                  style={
                    value === '90'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('90')}
                >
                  90d
                </div>
                <div
                  className="single__option"
                  style={
                    value === '180'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('180')}
                >
                  180d
                </div>
                <div
                  className="single__option"
                  style={
                    value === '365'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('365')}
                >
                  1y
                </div>
                <div
                  className="single__option"
                  style={
                    value === 'max'
                      ? { backgroundColor: 'rgb(62, 52, 146)' }
                      : {}
                  }
                  onClick={() => setValue('max')}
                >
                  MAX
                </div>
              </div>
            </div>
            <div className="single__header">
              <div className="single__info">
                <img src={coinData?.image?.large} alt={coinData?.name} />
                <h1 className="single__name">{coinData?.name}</h1>
                <span className="single__rank">
                  Rank: #{coinData?.coingecko_rank}
                </span>
              </div>
              <div className="single__details">
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      coinData.description ? coinData.description.en : ''
                    ),
                  }}
                  className="single__desc"
                ></p>
                <div className="single__bottom">
                  <span>
                    Price:{' '}
                    <span
                      style={isPositive(
                        Number(
                          coinData?.market_data?.price_change_percentage_24h
                        )
                      )}
                    >
                      {coinData?.market_data?.current_price?.usd?.toLocaleString()}
                      $
                    </span>
                  </span>
                  <span>
                    24h Change:{' '}
                    <span
                      style={isPositive(
                        Number(
                          coinData?.market_data?.price_change_percentage_24h
                        )
                      )}
                    >
                      {Number(
                        coinData?.market_data?.price_change_percentage_24h
                      )?.toFixed(2)}
                      %
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

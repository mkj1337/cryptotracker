import { useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { isPositive } from '../../../utils';
import { cryptosProps } from '../../../interfaces';
import axios from 'axios';

// styles
import './Slider.scss';
import { options } from '../../../api';

export const Slider = () => {
  const [cryptos, setCryptos] = useState<cryptosProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchTopCrypto = async () => {
      try {
        const { data } = await axios.get(
          'https://openapiv1.coinstats.app/coins?limit=5',
          options
        );
        setIsLoading(false);
        setCryptos(data.result);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    fetchTopCrypto();
  }, []);

  return (
    <>
      {isLoading ? (
        <SyncLoader color="rgb(62, 52, 146)" />
      ) : (
        cryptos.map((crypto) => (
          <Link
            to={`/coin/${crypto?.id}`}
            className="header__single"
            key={crypto?.id}
          >
            <img src={crypto?.icon} alt="" />
            <h2>
              {crypto?.name}{' '}
              <span style={isPositive(Number(crypto?.priceChange1d))}>
                {Number(crypto?.priceChange1d).toFixed(2).toLocaleString()}%
              </span>
            </h2>
            <div className="price">
              {Number(crypto?.price).toFixed(2).toLocaleString()} $
            </div>
          </Link>
        ))
      )}
    </>
  );
};

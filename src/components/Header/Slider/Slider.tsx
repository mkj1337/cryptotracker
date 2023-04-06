import { useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { isPositive } from '../../../utils';
import { cryptosProps } from '../../../interfaces';
import axios from 'axios';

// styles
import './Slider.scss';

export const Slider = () => {
  const [cryptos, setCryptos] = useState<cryptosProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchTopCrypto = async () => {
      try {
        const { data } = await axios.get(
          'https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false&locale=en'
        );
        setIsLoading(false);
        setCryptos(data);
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
            <img src={crypto?.image} alt="" />
            <h2>
              {crypto?.name}{' '}
              <span
                style={isPositive(Number(crypto?.price_change_percentage_24h))}
              >
                {Number(crypto?.price_change_percentage_24h)
                  .toFixed(2)
                  .toLocaleString()}
                %
              </span>
            </h2>
            <div className="price">
              {Number(crypto?.current_price).toFixed(2).toLocaleString()} $
            </div>
          </Link>
        ))
      )}
    </>
  );
};

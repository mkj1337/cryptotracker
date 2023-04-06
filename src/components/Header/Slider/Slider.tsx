import { useEffect, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import './Slider.scss';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Slider = () => {
  const [cryptos, setCryptos] = useState<any[]>([]);
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
        <SyncLoader color='rgb(62, 52, 146)' />
      ) : (
        cryptos.map((crypto) => (
          <Link
            to={`/coin/${crypto?.id}`}
            className="header__single"
            key={crypto.id}
          >
            <img src={crypto?.image} alt="" />
            <h2>
              {crypto.name}{' '}
              <span
                style={
                  crypto.price_change_percentage_24h > 0
                    ? { color: 'green' }
                    : { color: 'red' }
                }
              >
                {parseFloat(crypto.price_change_percentage_24h)
                  .toFixed(2)
                  .toLocaleString()}
                %
              </span>
            </h2>
            <div className="price">
              {crypto.current_price.toLocaleString()} $
            </div>
          </Link>
        ))
      )}
    </>
  );
};

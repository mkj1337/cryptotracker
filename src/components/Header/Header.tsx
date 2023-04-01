import { useEffect, useState } from 'react';
import axios from 'axios';

// styles
import './Header.scss';

export const Header = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchTopCrypto = async () => {
      try {
        const { data } = await axios.get(
          'https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false&locale=en'
        );
        setCryptos(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTopCrypto();
  }, []);

  return (
    <header className="header">
      <p className="header__title">
      Effortlessly Track 
        <span>Crypto Market Changes</span>
      </p>
      <div className="header__crypto">
        {cryptos.map((crypto) => (
          <div className="header__single" key={crypto.id}>
            <img src={crypto.image} alt="" />
            <h2>
              {crypto.name}{' '}
              <span
                style={
                  crypto.price_change_percentage_24h > 0
                    ? { color: 'green' }
                    : { color: 'red' }
                }
              >
                {parseFloat(crypto.price_change_percentage_24h).toFixed(2)}%
              </span>
            </h2>
            <div className="price">{crypto.current_price}$</div>
          </div>
        ))}
      </div>
    </header>
  );
};

import { useEffect, useState } from 'react';
import axios from 'axios';

// styles
import './MarketTable.scss';
import { Pagination } from '../Pagination/Pagination';
import { Link } from 'react-router-dom';

export const MarketTable = () => {
  const [cryptos, setCryptos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTopCrypto = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
        );
        setCryptos(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    fetchTopCrypto();
  }, []);

  const lastPostIndex = currentPage * 10;
  const firstPostIndex = lastPostIndex - 10;
  const currentCryptos = cryptos.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="market__wrapper" id="market">
      <h2 className="market__title">Market Update</h2>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <span>Loading...</span>}
          {cryptos.length ? (
            currentCryptos.map((crypto) => (
              <tr key={crypto.name}>
                <td>
                  <Link to={`/coin/${crypto?.id}`}>
                    <img src={crypto.image} alt="" />
                    <span>{crypto.name}</span>
                  </Link>
                </td>

                <td>{crypto.current_price} $</td>
                <td
                  style={
                    crypto.price_change_percentage_24h > 0
                      ? { color: 'green' }
                      : { color: 'red' }
                  }
                >
                  {Number(crypto.price_change_percentage_24h).toFixed(2)}%
                </td>
                <td>{crypto.market_cap} $</td>
              </tr>
            ))
          ) : (
            ''
          )}
        </tbody>
      </table>
      <div className="market__pagination">
        <Pagination
          totalCryptos={cryptos.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

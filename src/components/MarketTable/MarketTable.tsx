import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// styles
import './MarketTable.scss';
import { Pagination } from '../Pagination/Pagination';
import { Link } from 'react-router-dom';

export const MarketTable = () => {
  const [cryptos, setCryptos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clicks, setClicks] = useState<number>(0);
  const headRef = useRef(null);

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

  const sortCryptos = (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
    sortBy: string
  ) => {
    if (headRef.current) {
      Array.from(headRef.current['children']).forEach((el) => {
        if ((el as HTMLTableElement).className.includes('active'))
          return (el as HTMLTableElement).classList.remove('active');
      });
    }
    (e.target as HTMLTableElement).classList.add('active');
    switch (clicks) {
      case 0:
        setClicks(1);
        return cryptos.sort((a, b) => (b[sortBy] < a[sortBy] ? -1 : 1));
      case 1:
        setClicks(0);
        return cryptos.sort((a, b) => (b[sortBy] > a[sortBy] ? -1 : 1));
      default:
        return cryptos;
    }
  };

  const lastPostIndex = currentPage * 10;
  const firstPostIndex = lastPostIndex - 10;
  const currentCryptos = cryptos.slice(firstPostIndex, lastPostIndex);

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -50, opacity: 0 }}
      className="market__wrapper"
      id="market"
    >
      <table>
        <thead>
          <tr ref={headRef}>
            <th onClick={(e) => sortCryptos(e, 'name')}>Coin</th>
            <th onClick={(e) => sortCryptos(e, 'current_price')}>Price</th>
            <th onClick={(e) => sortCryptos(e, 'price_change_percentage_24h')}>
              24h Change
            </th>
            <th onClick={(e) => sortCryptos(e, 'market_cap')}>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <span>Loading...</span>}
          {cryptos.length
            ? currentCryptos.map((crypto) => (
                <tr key={crypto.name}>
                  <td>
                    <Link to={`/coin/${crypto?.id}`}>
                      <img src={crypto.image} alt="" />
                      <span>{crypto.name}</span>
                    </Link>
                  </td>

                  <td>{crypto.current_price.toFixed(2).toLocaleString()} $</td>
                  <td
                    style={
                      crypto.price_change_percentage_24h > 0
                        ? { color: 'green' }
                        : { color: 'red' }
                    }
                  >
                    {Number(crypto.price_change_percentage_24h)
                      .toFixed(2)
                      .toLocaleString()}
                    %
                  </td>
                  <td>{crypto.market_cap.toLocaleString()} $</td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
      <div className="market__pagination">
        <Pagination
          totalCryptos={cryptos.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </motion.div>
  );
};

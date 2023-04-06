import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Pagination } from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import { isPositive } from '../../utils';
import { SyncLoader } from 'react-spinners';

// styles
import './MarketTable.scss';

interface cryptosProps {
  id: string;
  name: string;
  image: string;
  current_price: number | string;
  price_change_percentage_24h: number | string;
  market_cap: number | string;
}

export const MarketTable = () => {
  const [cryptos, setCryptos] = useState<cryptosProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clicks, setClicks] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const searchRef = useRef(null);
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
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
    sortBy: string,
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
        return cryptos.sort((a: any, b: any) =>
          b[sortBy] < a[sortBy] ? -1 : 1
        );
      case 1:
        setClicks(0);
        return cryptos.sort((a: any, b: any) => (b[sortBy] > a[sortBy] ? -1 : 1));
      default:
        return cryptos;
    }
  };

  const searchCryptos = (data: any) => {
    const keys: string[] = ['name', 'symbol'];

    if (search.length) {
      return data.filter((crypto: any) =>
        keys.some((key) => crypto[key].toLowerCase().includes(search))
      );
    }
    return data;
  };

  const lastPostIndex = currentPage * 10;
  const firstPostIndex = lastPostIndex - 10;
  const currentCryptos = searchCryptos(cryptos).slice(
    firstPostIndex,
    lastPostIndex
  );

  const handleInputFocus = () => {
    if (document.activeElement === searchRef.current) {
      const cor = document
        .querySelector('input[type="text"]')
        ?.getBoundingClientRect() as DOMRect;
      const { x, y } = cor;
      window.scrollTo(x, y);
    }
  };

  return (
    <motion.div
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -50, opacity: 0 }}
      className="market__wrapper"
      id="market"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="search__bar"
      >
        <input
          type="text"
          value={search}
          onFocus={handleInputFocus}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="search a coin..."
          ref={searchRef}
        />
      </motion.div>
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
        <tbody
          style={
            isLoading
              ? {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              : {}
          }
        >
          {isLoading && <SyncLoader color="rgb(62, 52, 146)" />}
          {cryptos.length
            ? currentCryptos.map((crypto: cryptosProps) => (
                <tr key={crypto?.name}>
                  <td>
                    <Link to={`/coin/${crypto?.id}`}>
                      <img src={crypto?.image} alt="" />
                      <span>{crypto?.name}</span>
                    </Link>
                  </td>
                  <td>
                    {Number(crypto?.current_price)?.toFixed(2).toLocaleString()}{' '}
                    $
                  </td>
                  <td
                    style={isPositive(
                      Number(crypto?.price_change_percentage_24h)
                    )}
                  >
                    {Number(crypto?.price_change_percentage_24h)
                      .toFixed(2)
                      .toLocaleString()}
                    %
                  </td>
                  <td>{crypto?.market_cap?.toLocaleString()} $</td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
      <div className="market__pagination">
        <Pagination
          totalCryptos={searchCryptos(cryptos).length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </motion.div>
  );
};

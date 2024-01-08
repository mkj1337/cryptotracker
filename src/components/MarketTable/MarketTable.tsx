import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pagination } from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import { isPositive } from '../../utils';
import { SyncLoader } from 'react-spinners';
import { cryptosProps } from '../../interfaces';
import axios from 'axios';

// styles
import './MarketTable.scss';
import { options } from '../../api';

export const MarketTable = () => {
  const [cryptos, setCryptos] = useState<cryptosProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [clicks, setClicks] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const searchRef = useRef<HTMLInputElement>(null);
  const headRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    const fetchTopCrypto = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://openapiv1.coinstats.app/coins?limit=100`,
          options
        );
        setCryptos(data.result);
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
        return cryptos.sort((a: any, b: any) =>
          b[sortBy] < a[sortBy] ? -1 : 1
        );
      case 1:
        setClicks(0);
        return cryptos.sort((a: any, b: any) =>
          b[sortBy] > a[sortBy] ? -1 : 1
        );
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

  const lastPostIndex = currentPage * 7;
  const firstPostIndex = lastPostIndex - 7;
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
    <motion.section
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
            <th onClick={(e) => sortCryptos(e, 'price')}>Price</th>
            <th onClick={(e) => sortCryptos(e, 'priceChange1d')}>
              24h Change
            </th>
            <th onClick={(e) => sortCryptos(e, 'marketCap')}>Market Cap</th>
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
                      <img src={crypto?.icon} alt="" />
                      <span>{crypto?.name}</span>
                    </Link>
                  </td>
                  <td>
                    {Number(crypto?.price)?.toFixed(2).toLocaleString()} $
                  </td>
                  <td style={isPositive(Number(crypto?.priceChange1d))}>
                    {Number(crypto?.priceChange1d).toFixed(2).toLocaleString()}%
                  </td>
                  <td>{crypto?.marketCap?.toLocaleString()} $</td>
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
    </motion.section>
  );
};

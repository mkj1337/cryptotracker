import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// styles
import './SingleCoin.scss';

export const SingleCoin = () => {
  const [coin, setCoin] = useState({});
  const coinId = useLocation().pathname.split('/')[2];

  console.log(location);

  useEffect(() => {
    const fetchSingleCoin = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );
        setCoin(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleCoin();
  }, []);

  console.log(coin);

  return <div>SingleCoin</div>;
};

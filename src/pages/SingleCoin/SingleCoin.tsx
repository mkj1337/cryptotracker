import './SingleCoin.scss';
import { useState, useEffect } from 'react';

// styles
import './SingleCoin.scss';
import { HistoryChart } from '../../components/HistoryChart/HistoryChart';

export const SingleCoin = () => {
  const [value, setValue] = useState<string>('1');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="single__coin">
      <HistoryChart value={value} />
      <div className="single__select">
        <div
          className="single__option"
          style={value === '1' ? { backgroundColor: 'rgb(62, 52, 146)' } : {}}
          onClick={() => setValue('1')}
        >
          24h
        </div>
        <div
          className="single__option"
          style={value === '7' ? { backgroundColor: 'rgb(62, 52, 146)' } : {}}
          onClick={() => setValue('7')}
        >
          7d
        </div>
        <div
          className="single__option"
          style={value === '14' ? { backgroundColor: 'rgb(62, 52, 146)' } : {}}
          onClick={() => setValue('14')}
        >
          14d
        </div>
        <div
          className="single__option"
          style={value === '30' ? { backgroundColor: 'rgb(62, 52, 146)' } : {}}
          onClick={() => setValue('30')}
        >
          30d
        </div>
        <div
          className="single__option"
          style={value === '90' ? { backgroundColor: 'rgb(62, 52, 146)' } : {}}
          onClick={() => setValue('90')}
        >
          90d
        </div>
        <div
          className="single__option"
          style={value === '180' ? { backgroundColor: 'rgb(62, 52, 146)' } : {}}
          onClick={() => setValue('180')}
        >
          180d
        </div>
        <div
          className="single__option"
          style={value === '365' ? { backgroundColor: 'rgb(62, 52, 146)' } : {}}
          onClick={() => setValue('365')}
        >
          1y
        </div>
        <div
          className="single__option"
          style={value === 'max' ? { backgroundColor: 'rgb(62, 52, 146)' } : {}}
          onClick={() => setValue('max')}
        >
          MAX
        </div>
      </div>
    </div>
  );
};

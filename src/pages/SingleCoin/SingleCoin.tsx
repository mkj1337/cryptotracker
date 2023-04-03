import './SingleCoin.scss';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// styles
import './SingleCoin.scss';
import { HistoryChart } from '../../components/HistoryChart/HistoryChart';

export const SingleCoin = () => {
  const [value, setValue] = useState<string>('1');
  return (
    <div className="single__coin">
      <HistoryChart value={value} />
      <select onChange={(e) => setValue(e.target.value)}>
        <option value={1}>day</option>
        <option value={7}>week</option>
        <option value={31}>month</option>
        <option value={365}>year</option>
      </select>
    </div>
  );
};

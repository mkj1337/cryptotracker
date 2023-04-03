import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// styles
import './SingleCoin.scss';
import { HistoryChart } from '../../components/HistoryChart/HistoryChart';

export const SingleCoin = () => {

  return (
    <div className="single__coin">
      <HistoryChart />
    </div>
  );
};

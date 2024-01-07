export interface PaginationProps {
  totalCryptos: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface cryptosProps {
  id: string;
  name: string;
  icon: string;
  price: number | string;
  priceChange1d: number | string;
  marketCap: number | string;
  rank?: number;
  symbol?: string;
}

export interface HistoryChartProps {
  value: string;
}

export interface coinDataProps {
  name: string;
  image: {
    large: string;
  };
  description: {
    en: string;
  };
  market_data: {
    current_price: {
      usd: string | number;
    };
    price_change_percentage_24h: string | number;
  };
  symbol: string;
  coingecko_rank: string | number;
}

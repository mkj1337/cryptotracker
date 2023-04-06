export interface PaginationProps {
  totalCryptos: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface cryptosProps {
  id: string;
  name: string;
  image: string;
  current_price: number | string;
  price_change_percentage_24h: number | string;
  market_cap: number | string;
}

export interface HistoryChartProps {
  value: string;
}

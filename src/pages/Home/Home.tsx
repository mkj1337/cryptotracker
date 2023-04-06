import { Header } from '../../components/Header/Header';
import { MarketTable } from '../../components/MarketTable/MarketTable';

// styles
import './Home.scss';

export const Home = () => {
  return (
    <div className="home">
      <Header />
      <MarketTable />
    </div>
  );
};

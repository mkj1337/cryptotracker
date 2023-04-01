// styles
import './Pagination.scss';

interface PaginationProps {
  totalCryptos: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({
  totalCryptos,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalCryptos / 10); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination__wrapper">
      {pages.map((page, index) => (
        <button
          className={page === currentPage ? 'active' : ''}
          style={page > 9 ? { padding: '7px' } : {}}
          key={index}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

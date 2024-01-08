import { PaginationProps } from '../../interfaces';

// styles
import './Pagination.scss';

export const Pagination = ({
  totalCryptos,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  let pages: number[] = [];

  for (let i = 1; i <= Math.ceil(totalCryptos / 7); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination__wrapper">
      {pages.slice().map((page, index) => (
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

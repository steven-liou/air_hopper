import React, {useState} from 'react';

const Paginator = ({startRow, endRow, totalRows, rowsPerPage, page, movePage, totalPages, setRowsPerPage}) => {
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(rowsPerPage);
  return (
    <div>
      <Message startRoute={startRow + 1} endRoute={endRow} totalRoutes={totalRows} />
      <Button label='Previous Page' handleClick={() => movePage(-1)} disabled={page <= 0} />
      <Button label='Next Page' handleClick={() => movePage(1)} disabled={page >= totalPages - 1} />
      <input type='text' value={currentRowsPerPage} onChange={(e) => setCurrentRowsPerPage(Number(e.target.value))} />
      <button onClick={() => setRowsPerPage(currentRowsPerPage)}>Set Routes Per Page</button>
    </div>
  );
};

const Message = ({startRoute, endRoute, totalRoutes}) => (
  <p>
    Showing {startRoute}-{endRoute} of {totalRoutes} routes.
  </p>
);

const Button = ({label, handleClick, disabled}) => {
  return (
    <button onClick={handleClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Paginator;

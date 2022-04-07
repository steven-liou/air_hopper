import React, {useState} from 'react';

const Paginator = ({state, dispatch}) => {
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(state.rowsPerPage);
  const {startRow, endRow, totalRows, page, totalPages} = state;
  return (
    <div>
      <Message startRow={startRow + 1} endRow={endRow} totalRows={totalRows} />
      <Button label='Previous Page' handleClick={() => dispatch({type: 'PREVIOUS_PAGE'})} disabled={page <= 0} />
      <Button label='Next Page' handleClick={() => dispatch({type: 'NEXT_PAGE'})} disabled={page >= totalPages} />
      <input type='text' value={currentRowsPerPage} onChange={(e) => setCurrentRowsPerPage(Number(e.target.value))} />
      <button onClick={() => dispatch({type: 'SET_ROWS_PER_PAGE', payload: currentRowsPerPage})}>
        Set Routes Per Page
      </button>
    </div>
  );
};

const Message = ({startRow, endRow, totalRows}) => (
  <p>
    Showing {startRow}-{endRow} of {totalRows} routes.
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

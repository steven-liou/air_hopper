import React, {useState, useReducer} from 'react';

const initialState = {
  page: 0,
  totalPages: 0,
  totalRows: 0,
  startRow: 0,
  endRow: 0,
  rowsPerPage: 0,
};

const reducer = (state = initialState, action) => {
  const totalPages = Math.floor(state.totalRows / state.rowsPerPage);
  state = {...state, totalPages: totalPages};
  let page;
  let startRow;
  let endRow;

  switch (action.type) {
    case 'NEXT_PAGE':
      page = state.page + 1 > totalPages ? totalPages : state.page + 1;
      startRow = state.rowsPerPage * page;
      endRow = startRow + state.rowsPerPage;
      return {...state, page, startRow, endRow};
    case 'PREVIOUS_PAGE':
      page = state.page - 1 < 0 ? 0 : state.page - 1;
      startRow = state.rowsPerPage * page;
      endRow = startRow + state.rowsPerPage;
      return {...state, page, startRow, endRow};
    case 'SET_ROWS_PER_PAGE':
      const rowsPerPage = action.payload;
      endRow = state.startRow + rowsPerPage;
      return {...state, endRow, rowsPerPage};
    default:
      return state;
  }
};

export default reducer;

import React, {useState} from 'react';

const initialState = {
  page: 0,
  totalPages: 0,
  totalRows: 0,
  startRow: 0,
  endRow: 0,
  rowsPerPage: 0,
};

const reducer = (state = initialState, action) => {
  let totalPages = Math.floor(state.totalRows / state.rowsPerPage);
  state = {...state, totalPages: totalPages};
  let page;
  let startRow;
  let endRow;

  switch (action.type) {
    case 'NEXT_PAGE':
      page = state.page + 1 > totalPages ? totalPages : state.page + 1;
      startRow = state.rowsPerPage * page;
      endRow = startRow + state.rowsPerPage < state.totalRows ? startRow + state.rowsPerPage : state.totalRows;
      return {...state, page, startRow, endRow};
    case 'PREVIOUS_PAGE':
      page = state.page - 1 < 0 ? 0 : state.page - 1;
      startRow = state.rowsPerPage * page;
      endRow = startRow + state.rowsPerPage < state.totalRows ? startRow + state.rowsPerPage : state.totalRows;
      return {...state, page, startRow, endRow};
    case 'SET_ROWS_PER_PAGE':
      const rowsPerPage = action.payload;
      endRow = state.startRow + rowsPerPage < state.totalRows ? state.startRow + rowsPerPage : state.totalRows;
      totalPages = Math.floor(state.totalRows / rowsPerPage);
      return {...state, endRow, rowsPerPage, totalPages};
    case 'SET_TOTAL_ROWS':
      const totalRows = action.payload;
      startRow = 0;
      endRow = startRow + state.rowsPerPage < totalRows ? startRow + state.rowsPerPage : totalRows;
      totalPages = Math.floor(totalRows / state.rowsPerPage);
      return {...state, totalRows, totalPages, startRow, endRow, page: 0};
    default:
      return state;
  }
};

export default reducer;

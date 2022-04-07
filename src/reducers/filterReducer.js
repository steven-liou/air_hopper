import React, {useState} from 'react';

const initialState = {
  filters: [],
  data: [],
  filteredData: [],
};

const reducer = (state = initialState, action) => {
  let filters = state.filters.slice();
  let filteredData = state.data.slice();
  switch (action.type) {
    case 'FILTER':
      filters = filters.filter((filter) => filter.property !== action.payload.property);
      filters.push(action.payload);
      filteredData = filterData(filteredData, filters);
      return {...state, filteredData, filters};
    case 'ALL':
      filters = filters.filter((filter) => filter.property !== action.payload);
      filteredData = filterData(filteredData, filters);
      return {...state, filteredData, filters};
    default:
      return state;
  }
};

const filterData = (data, filters) => {
  filters.forEach(({property, value}) => {
    if (value !== 'all') {
      data = data.filter((d) => d[property] === value);
    }
  });
  return data;
};

export default reducer;

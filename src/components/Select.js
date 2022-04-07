import React, {useState} from 'react';

const Select = ({options, valueKeys, titleKey, label, value, onSelect}) => {
  const optionsValues = options
    .map((o) => valueKeys.map((k) => o[k]))
    .flat()
    .filter(onlyUnique);
  optionsValues.sort((a, b) => a.localeCompare(b));
  optionsValues.unshift('All');
  return (
    <>
      <label htmlFor={titleKey}>{label}</label>
      <select onChange={onSelect} id={titleKey} name={titleKey} value={value}>
        {optionsValues.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
};

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

export default Select;

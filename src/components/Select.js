import React, {useState} from 'react';

const Select = ({options, filteredOptions, valueKeys, titleKey, label, value, onSelect}) => {
  const optionsValues = options
    .map((o) => valueKeys.map((k) => o[k]))
    .flat()
    .filter(onlyUnique);
  optionsValues.sort((a, b) => a.localeCompare(b));
  optionsValues.unshift('All');
  const isDisabled = (opt) => {
    if (opt === 'All') return false;
    const found = filteredOptions.some((option) => {
      return valueKeys.some((key) => option[key] === opt);
    });
    return !found;
  };

  return (
    <>
      <label htmlFor={titleKey}>{label}</label>
      <select onChange={onSelect} id={titleKey} name={titleKey} value={value}>
        {optionsValues.map((option, index) => {
          return (
            <option key={index} value={option} disabled={isDisabled(option)}>
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

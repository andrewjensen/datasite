import React, { useState, useContext, useMemo } from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import { Printable } from '../interfaces';
import { printValue } from '../services/Printable';
import DatasetContext from '../../common/state/DatasetContext';
import { getColumnValues } from '../services/TableSettings';

interface EqualsListFilterSelectProps {
  column: string,
  selectedValues: Printable[],
  onSelectValues: (values: Printable[]) => void
}

const EqualsListFilterSelect: React.FC<EqualsListFilterSelectProps> = ({
  column,
  selectedValues,
  onSelectValues
}) => {
  const { dataset } = useContext(DatasetContext);
  const columnValues: Printable[] = useMemo(() => getColumnValues(dataset!.rows, column), [dataset, column]);
  const [searchValue, setSearchValue] = useState<string>('');

  function isValueSelected(value: Printable): boolean {
    return selectedValues.indexOf(value) !== -1;
  }

  function setValueSelected(value: Printable, isChecked: boolean) {
    if (isChecked) {
      onSelectValues([...selectedValues, value]);
    } else {
      onSelectValues(selectedValues.filter(selectedValue => selectedValue !== value));
    }
  }

  const searchFilteredValues = useMemo(() => {
    return searchValue === ''
      ? columnValues
      : columnValues.filter(value => printValue(value).indexOf(searchValue) !== -1);
  }, [columnValues, searchValue]);

  return (
    <Container>
      <SearchBar
        value={searchValue}
        onSetValue={setSearchValue}
      />
      <ListContainer>
        {searchFilteredValues.map(value => (
          <ValueListItem
            key={`${value}${typeof value}`}
            value={value}
            checked={isValueSelected(value)}
            onToggle={(isChecked: boolean) => setValueSelected(value, isChecked)}
          />
        ))}
      </ListContainer>
      <Summary>Selected: {selectedValues.length}</Summary>
    </Container>
  );
}

export default EqualsListFilterSelect;

const Container = styled.div`
`;

const ListContainer = styled.div`
  margin: 1rem 0;
  border: 1px solid #ccc;
  max-height: 10rem;
  overflow: auto;
`;

const Summary = styled.div`
  margin: 1rem 0;
  font-size: 12px;
  text-align: right;
`;

interface SearchBarProps {
  value: string
  onSetValue: (searchValue: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onSetValue
}) => (
  <FormControl>
    <InputLabel>Search</InputLabel>
    <Input
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      value={value}
      onChange={event => onSetValue(event.target.value)}
    />
  </FormControl>
);

interface ValueListItemProps {
  value: Printable
  checked: boolean
  onToggle: (isChecked: boolean) => void
}

const ValueListItem: React.FC<ValueListItemProps> = ({
  value,
  checked,
  onToggle
}) => (
  <ValueListItemContainer>
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          size="small"
          onChange={(event) => onToggle(event.target.checked)}
        />
      }
      label={printValue(value)}
    />
  </ValueListItemContainer>
);

const ValueListItemContainer = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 0 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

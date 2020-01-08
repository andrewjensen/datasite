import React, { useState, useContext, useMemo } from 'react';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import { Printable } from '../interfaces';
import { printValue } from '../services/Printable';
import DatasetContext from '../../common/state/DatasetContext';
import { getColumnValues } from '../services/TableSettings';

interface EqualsListFilterSelectProps {
  column: string
}

const EqualsListFilterSelect: React.FC<EqualsListFilterSelectProps> = ({
  column
}) => {
  const { dataset } = useContext(DatasetContext);
  const columnValues: Printable[] = useMemo(() => getColumnValues(dataset!.rows, column), [dataset, column]);
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <Container>
      <SearchBar
        value={searchValue}
        onSetValue={setSearchValue}
      />
      <ListContainer>
        {columnValues.map(value => (
          <ValueListItem
            key={`${value}${typeof value}`}
            value={value}
            checked={true}
          />
        ))}
      </ListContainer>
    </Container>
  );
}

export default EqualsListFilterSelect;

const Container = styled.div`
`;

const ListContainer = styled.div`
  max-height: 10rem;
  overflow: auto;
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
}

const ValueListItem: React.FC<ValueListItemProps> = ({
  value,
  checked
}) => (
  <ValueListItemContainer>
    <Checkbox
      checked={checked}
      size="small"
      value="small"
      onChange={() => {}}
    />
    {printValue(value)}
  </ValueListItemContainer>
);

const ValueListItemContainer = styled.div`
  border-bottom: 1px solid #ccc;
`;

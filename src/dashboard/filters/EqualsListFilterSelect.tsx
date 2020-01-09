import React, { useState, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
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

const LIST_ITEM_HEIGHT = 42;

interface EqualsListFilterSelectProps {
  column: string,
  selectedValues: Printable[],
  onSelectValues: (values: Printable[]) => void
}

interface RowProps {
  index: number
  style: any
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

  const searchFilteredValues: Printable[] = useMemo(() => {
    return searchValue === ''
      ? columnValues
      : columnValues.filter(value => printValue(value).indexOf(searchValue) !== -1);
  }, [columnValues, searchValue]);

  const Row: React.FC<RowProps> = ({ index, style }) => {
    const value = searchFilteredValues[index];
    return (
      <div style={style}>
        <ValueListItem
          value={value}
          checked={isValueSelected(value)}
          onToggle={(isChecked: boolean) => setValueSelected(value, isChecked)}
        />
      </div>
    );
  };

  return (
    <Container>
      <SearchBar
        value={searchValue}
        onSetValue={setSearchValue}
      />
      <ListContainer>
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              itemCount={searchFilteredValues.length}
              itemSize={LIST_ITEM_HEIGHT}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
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
  height: 10rem;
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
    <Checkbox
      checked={checked}
      size="small"
      onChange={(event) => onToggle(event.target.checked)}
    />
    <ValueListItemLabel
      title={printValue(value)}
      onClick={() => onToggle(!checked)}
    >
      {printValue(value)}
    </ValueListItemLabel>
  </ValueListItemContainer>
);

const ValueListItemContainer = styled.div`
  border-bottom: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const ValueListItemLabel = styled.div`
  flex-grow: 1;
  padding: 0 1rem 0 0;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`;

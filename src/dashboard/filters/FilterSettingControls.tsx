import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { FilterSetting, DataHeader } from '../interfaces';

interface FilterProps {
  filter: FilterSetting
  headers: DataHeader[]
  onEdit: (filter: FilterSetting) => void
  onDelete: () => void
}

const FilterSettingControls: React.FC<FilterProps> = ({
  filter,
  headers,
  onEdit,
  onDelete
}) => {

  function setColumn(column: string) {
    onEdit(({
      ...filter,
      column
    }));
  }

  function setFilterValue(filterValue: string) {
    onEdit(({
      ...filter,
      filterValue
    }));
  };

  return (
    <FilterContainer>

      <ControlContainer>
        <FormControl>
          <InputLabel>Column</InputLabel>
          <Select
            style={{width: 150}}
            value={filter.column}
            onChange={event => setColumn(event.target.value as string)}
          >
            {headers.map(header => (
              <MenuItem
                key={header.id}
                value={header.id}
              >{header.id}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </ControlContainer>

      <ControlContainer>
        <FormControl>
          <TextField
            style={{width: 150, marginTop: 0}}
            margin="normal"
            label="Contains"
            value={filter.filterValue}
            // placeholder="Hello world"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => setFilterValue(event.target.value)}
          />
        </FormControl>
      </ControlContainer>

      <ControlContainer>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ControlContainer>

    </FilterContainer>
  );
}

export default FilterSettingControls;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  margin-bottom: 1rem;
  padding: 1rem 1rem 0.5rem;
  background-color: #f0f0f0;
  border-radius: 0.25rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ControlContainer = styled.div`
  margin-right: 1rem;

  &:last-child {
    margin-right: 0;
  }
`;

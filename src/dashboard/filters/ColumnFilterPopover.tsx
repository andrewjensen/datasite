import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  FilterSetting,
  FilterType
} from '../interfaces';
import { FILTER_TYPES } from './constants';
import FilterContext from './FilterContext';
import { getAdHocFilter, getNextFilterId } from './helpers';

interface ColumnFilterPopoverProps {
  column: string
  open: boolean
  onClose: () => void
  anchorEl: Element | null
}

const ColumnFilterPopover: React.FC<ColumnFilterPopoverProps> = ({
  column,
  open,
  onClose,
  anchorEl
}) => {
  const { filters, onSetFilters } = useContext(FilterContext);

  const relatedFilter = getAdHocFilter(column, filters);
  const [currentFilter, setCurrentFilter] = useState<FilterSetting>(createCurrentFilter(relatedFilter));

  function createCurrentFilter(relatedFilter: FilterSetting | null): FilterSetting {
    if (relatedFilter) {
      return {
        ...relatedFilter
      };
    } else {
      const newFilter: FilterSetting = {
        id: -1,
        column: column,
        type: 'contains',
        filterValue: '',
        enabled: true,
        isAdHoc: true
      };
      return newFilter;
    }
  }

  function onClickApply() {
    if (currentFilter.id === -1) {
      // Add a new filter
      const savedFilter = {
        ...currentFilter,
        id: getNextFilterId(filters)
      };
      onSetFilters([...filters, savedFilter]);
      setCurrentFilter(savedFilter);
    } else {
      // Edit the existing filter
      onSetFilters(
        filters.map(filter =>
          filter.id === currentFilter.id
            ? currentFilter
            : filter
        )
      );
    }

    onClose();
  }

  function onClickDelete() {
    onSetFilters(
      filters.filter(filterSetting => filterSetting.id !== currentFilter.id)
    );
    setCurrentFilter(createCurrentFilter(null));
    onClose();
  }

  function setType(type: FilterType) {
    setCurrentFilter({
      ...currentFilter,
      type: type
    });
  }

  function setFilterValue(value: string) {
    setCurrentFilter({
      ...currentFilter,
      filterValue: value
    });
  }

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Paper>
        <PopoverBody>
          <PopoverTitle>Apply filter</PopoverTitle>

          <ControlContainer>
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select
                style={{width: 200}}
                value={currentFilter.type}
                onChange={event => setType(event.target.value as FilterType)}
              >
                {FILTER_TYPES.map(filterType => (
                  <MenuItem
                    key={filterType.type}
                    value={filterType.type}
                  >{filterType.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </ControlContainer>

          <ControlContainer>
            <FormControl>
              <TextField
                style={{width: 200, marginTop: 0}}
                margin="normal"
                label="Value"
                value={currentFilter.filterValue}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={event => setFilterValue(event.target.value)}
              />
            </FormControl>
          </ControlContainer>
        </PopoverBody>

        <PopoverActions>
          {currentFilter.id !== -1 && (
            <SecondaryAction>
              <IconButton
                color="secondary"
                size="small"
                onClick={onClickDelete}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </SecondaryAction>
          )}
          <PrimaryActions>
            <Button
              size="small"
              color="primary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={onClickApply}
            >
              Apply
            </Button>
          </PrimaryActions>
        </PopoverActions>
      </Paper>
    </Popover>
  )
};

export default ColumnFilterPopover;

const PopoverBody = styled.div`
  padding: 0.5rem 1rem;
`;

const PopoverActions = styled.div`
  padding: 0.5rem 1rem;
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PrimaryActions = styled.div`
  flex-grow: 1;
  text-align: right;
`;

const SecondaryAction = styled.div`
`;

const PopoverTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 1rem;
  padding: 0;
`;

const ControlContainer = styled.div`
  margin: 1rem 0;
`;

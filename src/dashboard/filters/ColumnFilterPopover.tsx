import React from 'react';
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

import { FILTER_TYPES } from './constants';
import {
  FilterSetting,
  FilterType
} from '../interfaces';

interface ColumnFilterPopoverProps {
  open: boolean
  onClose: () => void
  anchorEl: Element | null
}

const ColumnFilterPopover: React.FC<ColumnFilterPopoverProps> = ({
  open,
  onClose,
  anchorEl
}) => {
  const filter: FilterSetting = {
    id: 0,
    column: '',
    type: 'contains',
    filterValue: '',
    enabled: true
  };

  function onClickApply() {
    // TODO: implement
    onClose();
  }

  function setType(type: FilterType) {
    // TODO: implement
  }

  function setFilterValue(value: string) {
    // TODO: implement
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
                value={filter.type}
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
                value={filter.filterValue}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={event => setFilterValue(event.target.value)}
              />
            </FormControl>
          </ControlContainer>
        </PopoverBody>

        <PopoverActions>
          <SecondaryAction>
            <IconButton
              color="secondary"
              size="small"
              onClick={() => {}}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </SecondaryAction>
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

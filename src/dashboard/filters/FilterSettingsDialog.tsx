import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';

import { FilterSetting, DataHeader } from '../interfaces';
import { getNextFilterId } from './helpers';
import FilterSettingControls from './FilterSettingControls';
import FilterContext from './FilterContext';

interface Props {
  headers: DataHeader[]
  onClose: () => void
}

const FilterSettingsDialog: React.FC<Props> = ({
  headers,
  onClose
}) => {
  const { filters, onSetFilters } = useContext(FilterContext);

  const [currentFilters, setCurrentFilters] = useState<FilterSetting[]>(filters);

  useEffect(() => {
    setCurrentFilters(filters);
  }, [filters]);

  function editFilter(editedFilter: FilterSetting) {
    setCurrentFilters(
      currentFilters.map(currentFilter => (
        currentFilter.id === editedFilter.id
          ? editedFilter
          : currentFilter
      ))
    );
  };

  function deleteFilter(id: number) {
    setCurrentFilters(
      currentFilters.filter(currentFilter => currentFilter.id !== id)
    );
  }

  function addNewFilter() {
    const id = getNextFilterId(currentFilters);
    const newFilter: FilterSetting = {
      id,
      column: headers[0].id,
      type: 'contains',
      filterValue: '',
      enabled: false
    };
    setCurrentFilters([
      ...currentFilters,
      newFilter
    ]);
  }

  function onClickSave() {
    // onSave(currentFilters);
    onSetFilters(currentFilters);
    onClose();
  };

  return (
    <Dialog
      open={true}
      keepMounted
      onClose={onClose}
    >
      <DialogTitle>Edit Filters</DialogTitle>
      <DialogContent>
        {currentFilters.map(filter => (
          <FilterSettingControls
            key={filter.id}
            filter={filter}
            headers={headers}
            onEdit={editFilter}
            onDelete={() => deleteFilter(filter.id)}
          />
        ))}
        <AddFilterContainer>
          <Button
            variant="outlined"
            color="default"
            startIcon={<AddIcon />}
            onClick={addNewFilter}
          >
            Add filter
          </Button>
        </AddFilterContainer>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onClickSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FilterSettingsDialog;

const AddFilterContainer = styled.div`
  margin-top: 1rem;
`;

import React from 'react';
import { FilterSetting } from '../interfaces';

interface FilterContextContents {
  filters: FilterSetting[]
  onToggleFilter: (id: number) => void
  onSetFilters: (filters: FilterSetting[]) => void
}

const FilterContext = React.createContext<FilterContextContents>({
  filters: [],
  onToggleFilter: () => {},
  onSetFilters: () => {}
});

export default FilterContext;

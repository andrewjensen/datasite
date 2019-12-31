import { FilterSetting } from '../interfaces';

export function getNextFilterId(currentFilters: FilterSetting[]): number {
  let maxId = 0;
  for (let filter of currentFilters) {
    if (filter.id > maxId) {
      maxId = filter.id;
    }
  }
  return maxId + 1;
}

export function getAdHocFilter(columnId: string, filters: FilterSetting[]): FilterSetting | null {
  return filters.find(filter => filter.isAdHoc && filter.column === columnId) || null;
}

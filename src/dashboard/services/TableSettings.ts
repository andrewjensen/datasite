import {
  FilterSetting,
  OrderSetting,
  DataRow
} from '../interfaces';
import { printValue } from './Printable';

export async function applyTableSettingsAsync(rows: DataRow[], filterSettings: FilterSetting[], orderSetting: OrderSetting): Promise<DataRow[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredRows = applyFilters(rows, filterSettings);
      const orderedRows = applyOrdering(filteredRows, orderSetting);
      resolve(orderedRows);
    });
  });
}

export function applyFilters(rows: DataRow[], filterSettings: FilterSetting[]): DataRow[] {
  const enabledFilters = filterSettings.filter(filter => filter.enabled);
  return rows.filter(row => {
    for (let filter of enabledFilters) {
      if (!filterIncludesRow(row, filter)) {
        return false;
      }
    }
    return true;
  });
}

export function applyOrdering(rows: DataRow[], orderSetting: OrderSetting): DataRow[] {
  if (orderSetting.column === null) {
    return rows;
  } else {
    const columnName = orderSetting.column;
    return rows.sort((rowA, rowB) => {
      const rawValueA = rowA.cells[columnName];
      const rawValueB = rowB.cells[columnName];

      if (typeof rawValueA === 'string' && typeof rawValueB === 'string') {
        if (orderSetting.direction === 'desc') {
          return rawValueB.localeCompare(rawValueA);
        } else {
          return rawValueA.localeCompare(rawValueB);
        }
      } else if (typeof rawValueA === 'number' && typeof rawValueB === 'number') {
        if (orderSetting.direction === 'desc') {
          return rawValueB - rawValueA;
        } else {
          return rawValueA - rawValueB;
        }
      } else {
        throw new Error('Case not implemented');
      }
    });
  }
}

function filterIncludesRow(row: DataRow, filter: FilterSetting): boolean {
  const columnRawValue = row.cells[filter.column];
  const columnValue = printValue(columnRawValue);

  return (columnValue.indexOf(filter.filterValue) !== -1);
};

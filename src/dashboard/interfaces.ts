export type Printable = string | number | boolean;

export type SortDirection = 'asc' | 'desc';

export interface DataHeader {
  id: string,
  title: string
}

export interface DataRow {
  id: string,
  cells: {
    [columnName: string]: Printable
  }
}

export interface FilterSetting {
  id: number,
  column: string,
  filterValue: string
  enabled: boolean
}

export interface OrderSetting {
  column: string | null
  direction: SortDirection
}

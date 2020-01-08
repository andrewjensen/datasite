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

export type FilterType = 'contains' | 'regex' | 'equals' | 'equalsList';

export interface FilterSetting {
  id: number
  column: string
  type: FilterType
  filterValue?: string
  filterItemValues?: Printable[]
  enabled: boolean
  isAdHoc?: boolean
}

export interface OrderSetting {
  column: string | null
  direction: SortDirection
}

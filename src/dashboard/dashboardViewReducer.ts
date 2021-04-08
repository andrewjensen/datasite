import { Dataset, ManifestDashboard } from '../common/interfaces';
import { DataRow, FilterSetting, OrderSetting } from './interfaces';
import { decodeState } from './urlState';
import { getNextFilterId } from './filters/helpers';

export interface DashboardViewState {
  isLoaded: boolean
  allRows: DataRow[]
  filters: FilterSetting[]
  orderSetting: OrderSetting
}

export type DashboardViewAction =
  | { type: 'LOAD_DASHBOARD', dataset: Dataset, dashboard: ManifestDashboard, urlState: string | null }
  | { type: 'SET_FILTERS', filters: FilterSetting[] }
  | { type: 'SET_ORDER', orderSetting: OrderSetting }

const EMPTY_ORDER_SETTING: OrderSetting = {
  column: null,
  direction: 'asc'
};

export const INITIAL_STATE: DashboardViewState = {
  isLoaded: false,
  allRows: [],
  filters: [],
  orderSetting: EMPTY_ORDER_SETTING
};

export function dashboardViewReducer(state: DashboardViewState, action: DashboardViewAction): DashboardViewState {
  switch (action.type) {
    case 'LOAD_DASHBOARD':
      if (action.urlState) {
        const { filters: decodedFilters, orderSetting } = decodeState(action.urlState);
        const mergedFilters = mergeFilters(action.dashboard.filters, decodedFilters);
        return {
          ...state,
          isLoaded: true,
          allRows: action.dataset.rows,
          filters: mergedFilters,
          orderSetting
        };
      } else {
        return {
          ...state,
          isLoaded: true,
          allRows: action.dataset.rows,
          filters: action.dashboard.filters,
          orderSetting: EMPTY_ORDER_SETTING
        };
      }
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.filters
      };
    case 'SET_ORDER':
      return {
        ...state,
        orderSetting: action.orderSetting
      };
    default:
      return state;
  }
}

function mergeFilters(existingFilters: FilterSetting[], newFilters: FilterSetting[]): FilterSetting[] {
  const nextId = getNextFilterId(existingFilters);
  const newFiltersWithIds: FilterSetting[] = newFilters
    .map((filter, idx) => ({
      ...filter,
      id: nextId + idx
    }));

  return [...existingFilters, ...newFiltersWithIds];
}

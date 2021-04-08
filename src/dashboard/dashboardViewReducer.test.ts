import {
  dashboardViewReducer,
  DashboardViewState,
  DashboardViewAction,
  INITIAL_STATE
} from './dashboardViewReducer';
import MOCK_MANIFEST from '../common/components/MockManifest';
import { MOCK_DATASET } from '../dashboard/MockData';

describe('dashboardViewReducer', () => {
  it('should load a dashboard without URL state', () => {
    const state: DashboardViewState = INITIAL_STATE;
    const action: DashboardViewAction = {
      type: 'LOAD_DASHBOARD',
      dashboard: MOCK_MANIFEST.dashboards[0],
      dataset: MOCK_DATASET,
      urlState: null
    };
    const nextState = dashboardViewReducer(state, action);
    expect(nextState.isLoaded).toBe(true);
    expect(nextState.filters).toEqual([
      {
        id: 1,
        column: 'color',
        type: 'equals',
        filterValue: 'blue',
        enabled: false
      },
      {
        id: 2,
        column: 'color',
        type: 'equals',
        filterValue: 'red',
        enabled: false
      },
      {
        id: 3,
        column: 'shape',
        type: 'equals',
        filterValue: 'circle',
        enabled: false
      },
      {
        id: 4,
        column: 'deluxe',
        type: 'equals',
        filterValue: 'true',
        enabled: false
      }
    ]);
    expect(nextState.orderSetting).toEqual({
      column: null,
      direction: 'asc'
    });
  });

  it('should load a dashboard with URL state', () => {
    const state: DashboardViewState = INITIAL_STATE;
    const action: DashboardViewAction = {
      type: 'LOAD_DASHBOARD',
      dashboard: MOCK_MANIFEST.dashboards[0],
      dataset: MOCK_DATASET,
      urlState: 'gqRmaWx0kYSjY29spWNvbG9ypHR5cGWqZXF1YWxzTGlzdKN2YWzApWl0ZW1zkqNyZWSmeWVsbG93o29yZIKjY29spXNoYXBlo2RpcqRkZXNj'
    };
    const nextState = dashboardViewReducer(state, action);
    expect(nextState.isLoaded).toBe(true);
    expect(nextState.filters).toEqual([
      {
        id: 1,
        column: 'color',
        type: 'equals',
        filterValue: 'blue',
        enabled: false
      },
      {
        id: 2,
        column: 'color',
        type: 'equals',
        filterValue: 'red',
        enabled: false
      },
      {
        id: 3,
        column: 'shape',
        type: 'equals',
        filterValue: 'circle',
        enabled: false
      },
      {
        id: 4,
        column: 'deluxe',
        type: 'equals',
        filterValue: 'true',
        enabled: false
      },
      {
        id: 5,
        enabled: true,
        column: 'color',
        type: 'equalsList',
        filterItemValues: ['red', 'yellow'],
        isAdHoc: true
      }
    ]);
    expect(nextState.orderSetting).toEqual({
      column: 'shape',
      direction: 'desc'
    });
  });

  it('should set filters', () => {
    const state: DashboardViewState = INITIAL_STATE;
    const action: DashboardViewAction = {
      type: 'SET_FILTERS',
      filters: [
        {
          id: 1,
          column: 'color',
          type: 'equalsList',
          filterItemValues: ['red', 'blue'],
          enabled: true,
          isAdHoc: true
        }
      ]
    };
    const nextState = dashboardViewReducer(state, action);
    expect(nextState.filters).toEqual([
      {
        id: 1,
        column: 'color',
        type: 'equalsList',
        filterItemValues: ['red', 'blue'],
        enabled: true,
        isAdHoc: true
      }
    ]);
  });

  it('should set orderSetting', () => {
    const state: DashboardViewState = INITIAL_STATE;
    const action: DashboardViewAction = {
      type: 'SET_ORDER',
      orderSetting: {
        column: 'shape',
        direction: 'desc'
      }
    };
    const nextState = dashboardViewReducer(state, action);
    expect(nextState.orderSetting).toEqual({
      column: 'shape',
      direction: 'desc'
    });
  });
});

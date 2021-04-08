import React, { useState, useContext, useEffect, useCallback, useReducer } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';

import { applyTableSettingsAsync } from './services/TableSettings';
import DashboardTable from './DashboardTable';
import FilterControlPanel from './filters/FilterControlPanel';
import FilterContext from './filters/FilterContext';
import { ManifestDashboard } from '../common/interfaces';
import {
  DataRow,
  FilterSetting,
  OrderSetting
} from './interfaces';
import MarkdownContent from '../common/components/MarkdownContent';
import DatasetContext from '../common/state/DatasetContext';
import { encodeState } from './urlState';
import { dashboardViewReducer, INITIAL_STATE } from './dashboardViewReducer';

interface Props {
  dashboard: ManifestDashboard
}

const DashboardView: React.FC<Props> = ({
  dashboard
}) => {
  const { dataset } = useContext(DatasetContext);
  const location = useLocation();
  const history = useHistory();

  const [state, dispatch] = useReducer(dashboardViewReducer, INITIAL_STATE);

  const [visibleRows, setVisibleRows] = useState<DataRow[]>([]);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const updateTableData = useCallback(async (currentFilters: FilterSetting[], currentOrderSetting: OrderSetting) => {
    setIsTableLoading(true);

    const rowsToSet =
      state.allRows.length
        ? state.allRows
        : dataset!.rows;

    const newData = await applyTableSettingsAsync(rowsToSet, currentFilters, currentOrderSetting);
    setVisibleRows(newData);

    setIsTableLoading(false);
  }, [state, dataset, setIsTableLoading, setVisibleRows]);

  // Load the dashboard
  useEffect(() => {
    if (dataset && !state.isLoaded) {
      const searchParams = new URLSearchParams(location.search);
      const urlState = searchParams.get('state');
      dispatch({
        type: 'LOAD_DASHBOARD',
        dataset,
        dashboard,
        urlState
      });
    }
  }, [state, dispatch, dataset, dashboard, location.search]);

  // Update visible rows asynchronously when other settings change
  useEffect(() => {
    updateTableData(state.filters, state.orderSetting);

    // Update the urlState to match the new settings
    const encoded = encodeState(state.filters, state.orderSetting);
    history.replace(`${location.pathname}?state=${encoded}`);

  }, [history, location.pathname, state.allRows, state.filters, state.orderSetting, updateTableData]);

  function onToggleFilter(id: number) {
    const newFilters = state.filters
      .map(filter =>
        filter.id === id
          ? ({ ...filter, enabled: !filter.enabled })
          : filter
      );
    dispatch({ type: 'SET_FILTERS', filters: newFilters });
  }

  function onSetFilters(newFilters: FilterSetting[]) {
    dispatch({ type: 'SET_FILTERS', filters: newFilters });
  }

  function updateOrdering(newOrderSetting: OrderSetting) {
    dispatch({ type: 'SET_ORDER', orderSetting: newOrderSetting });
  }

  return (
    <FilterContext.Provider value={{
      filters: state.filters,
      onToggleFilter,
      onSetFilters
    }}>
      <Container>
        <InnerItem>
          <Header>{dashboard.title}</Header>
          <DescriptionContainer>
            <MarkdownContent content={dashboard.description} />
          </DescriptionContainer>
        </InnerItem>

        <InnerItem>
          <FilterControlPanel
            displayedRowCount={visibleRows.length}
            totalRowCount={state.allRows.length}
            headers={dataset!.headers}
          />
        </InnerItem>

        <TableContainer>
          <DashboardTable
            isLoading={isTableLoading}
            headers={dataset!.headers}
            rows={visibleRows}
            orderSetting={state.orderSetting}
            onChangeOrderSetting={updateOrdering}
          />
        </TableContainer>
      </Container>
    </FilterContext.Provider>
  );
};

export default DashboardView;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-content: stretch;
`;

const InnerItem = styled.div`

`;

const TableContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const Header = styled.h1`
  margin: 1rem 2rem 2rem;
  font-size: 28px;
  font-weight: bold;
`;

const DescriptionContainer = styled.div`
  margin: 0 2rem;
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { applyTableSettingsAsync } from './services/TableSettings';
import DashboardTable from './DashboardTable';
import FilterControlPanel from './filters/FilterControlPanel';
import FilterContext from './filters/FilterContext';
import {
  DataRow,
  FilterSetting,
  OrderSetting
} from './interfaces';
import {
  MOCK_DATA,
  HEADERS,
  INITIAL_FILTERS,
  INITIAL_ORDER_SETTING
} from './MockData';

const Dashboard: React.FC = () => {
  const { dashboardSlug } = useParams();

  const allRows = MOCK_DATA;

  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterSetting[]>(INITIAL_FILTERS);
  const [rows, setRows] = useState<DataRow[]>(allRows);
  const [orderSetting, setOrderSetting] = useState<OrderSetting>(INITIAL_ORDER_SETTING);

  function onToggleFilter(id: number) {
    const newFilters = filters
      .map(filter =>
        filter.id === id
          ? ({ ...filter, enabled: !filter.enabled })
          : filter
      );
    setFilters(newFilters);
    updateTableData(newFilters, orderSetting);
  }

  function onSetFilters(newFilters: FilterSetting[]) {
    setFilters(newFilters);
    updateTableData(newFilters, orderSetting);
  }

  function updateOrdering(newOrderSetting: OrderSetting) {
    setOrderSetting(newOrderSetting);
    updateTableData(filters, newOrderSetting);
  }

  async function updateTableData(currentFilters: FilterSetting[], currentOrderSetting: OrderSetting) {
    setIsTableLoading(true);

    const newData = await applyTableSettingsAsync(allRows, currentFilters, currentOrderSetting);
    setRows(newData);

    setIsTableLoading(false);
  }

  function renderLoadingState() {
    return (
      <Container>
        <LoadingMessage>
          Loading...
        </LoadingMessage>
      </Container>
    );
  }

  if (isPageLoading) {
    return renderLoadingState();
  }

  return (
    <FilterContext.Provider value={{
      filters,
      onToggleFilter,
      onSetFilters
    }}>
      <Container>
        <InnerItem>
          <Header>My Dashboard: {dashboardSlug}</Header>
          <Description />
        </InnerItem>

        <InnerItem>
          <FilterControlPanel
            displayedRowCount={rows.length}
            totalRowCount={allRows.length}
            headers={HEADERS}
          />
        </InnerItem>

        <TableContainer>
          <DashboardTable
            isLoading={isTableLoading}
            headers={HEADERS}
            rows={rows}
            orderSetting={orderSetting}
            onChangeOrderSetting={updateOrdering}
          />
        </TableContainer>
      </Container>
    </FilterContext.Provider>
  );
}

export default Dashboard;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-content: stretch;
  padding-top: 1rem;
`;

const InnerItem = styled.div`

`;

const TableContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const Header = styled.h1`
  margin: 0 2rem;
  font-size: 28px;
  font-weight: bold;
`;

const LoadingMessage = styled.div`
  margin: 5rem 0;
  text-align: center;
  font-size: 20px;
`;

const Description: React.FC = () => (
  <DescriptionContainer>
    <p>Custom dashboard description goes here.</p>
    <p><i>Markdown</i> should be supported.</p>
    <p>External <a href="https://google.com">links</a> should work.</p>
  </DescriptionContainer>
);

const DescriptionContainer = styled.div`
  margin: 0 2rem;
`;

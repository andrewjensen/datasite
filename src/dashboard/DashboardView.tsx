import React, { useState } from 'react';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';

import { applyTableSettingsAsync } from './services/TableSettings';
import DashboardTable from './DashboardTable';
import FilterControlPanel from './filters/FilterControlPanel';
import FilterContext from './filters/FilterContext';
import { Dataset, ManifestDashboard } from '../common/interfaces';
import {
  DataRow,
  FilterSetting,
  OrderSetting
} from './interfaces';
import {
  INITIAL_FILTERS,
  INITIAL_ORDER_SETTING
} from './MockData';

interface Props {
  dashboard: ManifestDashboard
  dataset: Dataset
}

const DashboardView: React.FC<Props> = ({
  dashboard,
  dataset
}) => {
  const allRows = dataset.rows;

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

  return (
    <FilterContext.Provider value={{
      filters,
      onToggleFilter,
      onSetFilters
    }}>
      <Container>
        <InnerItem>
          <Header>{dashboard.title}</Header>
          <Description>{dashboard.description}</Description>
        </InnerItem>

        <InnerItem>
          <FilterControlPanel
            displayedRowCount={rows.length}
            totalRowCount={allRows.length}
            headers={dataset.headers}
          />
        </InnerItem>

        <TableContainer>
          <DashboardTable
            isLoading={isTableLoading}
            headers={dataset.headers}
            rows={rows}
            orderSetting={orderSetting}
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

const Description: React.FC = ({ children }) => (
  <DescriptionContainer>
    <Markdown>{children}</Markdown>
  </DescriptionContainer>
);

const DescriptionContainer = styled.div`
  margin: 0 2rem;
`;

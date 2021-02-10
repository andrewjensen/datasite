import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

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

interface Props {
  dashboard: ManifestDashboard
}

const EMPTY_ORDER_SETTING: OrderSetting = {
  column: null,
  direction: 'asc'
};

const DashboardView: React.FC<Props> = ({
  dashboard
}) => {
  const { dataset } = useContext(DatasetContext);

  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterSetting[]>(dashboard.filters);
  const [allRows, setAllRows] = useState<DataRow[]>([]);
  const [visibleRows, setVisibleRows] = useState<DataRow[]>([]);
  const [orderSetting, setOrderSetting] = useState<OrderSetting>(EMPTY_ORDER_SETTING);

  useEffect(() => {
    if (dataset) {
      setFilters(dashboard.filters);
      setAllRows(dataset.rows);
      setVisibleRows(dataset.rows);
      setOrderSetting(EMPTY_ORDER_SETTING);
    }
  }, [dataset, dashboard]);

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
    setVisibleRows(newData);

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
          <DescriptionContainer>
            <MarkdownContent content={dashboard.description} />
          </DescriptionContainer>
        </InnerItem>

        <InnerItem>
          <FilterControlPanel
            displayedRowCount={visibleRows.length}
            totalRowCount={allRows.length}
            headers={dataset!.headers}
          />
        </InnerItem>

        <TableContainer>
          <DashboardTable
            isLoading={isTableLoading}
            headers={dataset!.headers}
            rows={visibleRows}
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

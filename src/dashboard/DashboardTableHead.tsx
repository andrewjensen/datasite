import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FilterListIcon from '@material-ui/icons/FilterList';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {
  DataHeader,
  OrderSetting,
  SortDirection
} from './interfaces';
import DashboardTableHeadButton from './DashboardTableHeadButton';
import ColumnFilterPopover from './filters/ColumnFilterPopover';
import FilterContext from './filters/FilterContext';
import { getAdHocFilter } from './filters/helpers';

interface HeadProps {
  headers: DataHeader[]
  orderSetting: OrderSetting
  onChangeOrderSetting: (orderSetting: OrderSetting) => void
}

const DashboardTableHead: React.FC<HeadProps> = ({
  headers,
  orderSetting,
  onChangeOrderSetting
}) => (
  <TableHead>
    <TableRow>
      {headers.map(header => (
        <DashboardTableHeadCell
          key={header.id}
          header={header}
          orderSetting={orderSetting}
          onChangeOrderSetting={onChangeOrderSetting}
        />
      ))}
    </TableRow>
  </TableHead>
);

export default DashboardTableHead;

interface HeadCellProps {
  header: DataHeader
  orderSetting: OrderSetting
  onChangeOrderSetting: (orderSetting: OrderSetting) => void
}

const DashboardTableHeadCell: React.FC<HeadCellProps> = ({
  header,
  orderSetting,
  onChangeOrderSetting
}) => {
  const { filters } = useContext(FilterContext);

  const hasFilter = !!getAdHocFilter(header.id, filters);

  return (
    <TableCell>
      <HeaderContent>
        <HeaderTitle>
          {header.title}
        </HeaderTitle>

        <HeaderControls>
          <OrderButton
            direction={orderSetting.column === header.id ? orderSetting.direction : null}
            onSetDirection={
              (direction: SortDirection) =>
                onChangeOrderSetting({
                  column: header.id,
                  direction
                })
            }
          />

          <FilterButton
            column={header.id}
            active={hasFilter}
          />
        </HeaderControls>
      </HeaderContent>
    </TableCell>
  );
};

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 0;
`;

const HeaderTitle = styled.div`
  margin-right: 8px;
  user-select: none;
  line-height: 24px;
`;

const HeaderControls = styled.div`

`;

interface OrderButtonProps {
  direction: SortDirection | null
  onSetDirection: (direction: SortDirection) => void
}

const OrderButton: React.FC<OrderButtonProps> = ({
  direction,
  onSetDirection
}) => (
  <DashboardTableHeadButton
    active={direction !== null}
    onClick={() => onSetDirection(getNextDirection(direction))}
  >
    {direction === 'desc' ? (
      <ArrowDownwardIcon fontSize="inherit" />
    ) : (
      <ArrowUpwardIcon fontSize="inherit" />
    )}
  </DashboardTableHeadButton>
);

function getNextDirection(currentDirection: SortDirection | null): SortDirection {
  if (currentDirection === 'asc') {
    return 'desc';
  } else {
    return 'asc';
  }
}

interface FilterButtonProps {
  column: string
  active: boolean
}

const FilterButton: React.FC<FilterButtonProps> = ({
  column,
  active
}) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return (
    <>
      <DashboardTableHeadButton
        active={active}
        ref={el => setAnchorEl(el)}
        onClick={() => setPopoverOpen(!popoverOpen)}
      >
        <FilterListIcon fontSize="inherit" />
      </DashboardTableHeadButton>
      <ColumnFilterPopover
        column={column}
        open={popoverOpen}
        onClose={() => setPopoverOpen(false)}
        anchorEl={anchorEl}
      />
    </>
  )
};

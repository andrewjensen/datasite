import React from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
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
}) => (
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
          active={false}
        />
      </HeaderControls>
    </HeaderContent>
  </TableCell>
);

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderTitle = styled.div`
  margin-right: 4px;
  user-select: none;
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
  <IconButton
    color={direction === null ? undefined : 'primary'}
    size="small"
    onClick={() => onSetDirection(getNextDirection(direction))}
  >
    {direction === 'desc' ? (
      <ArrowDownwardIcon fontSize="inherit" />
    ) : (
      <ArrowUpwardIcon fontSize="inherit" />
    )}
  </IconButton>
);

function getNextDirection(currentDirection: SortDirection | null): SortDirection {
  if (currentDirection === 'asc') {
    return 'desc';
  } else {
    return 'asc';
  }
}

interface FilterButtonProps {
  active: boolean
}

const FilterButton: React.FC<FilterButtonProps> = ({
  active
}) => (
  <IconButton
    color={active ? 'primary' : undefined}
    size="small"
  >
    <FilterListIcon fontSize="inherit" />
  </IconButton>
);

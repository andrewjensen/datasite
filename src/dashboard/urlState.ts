import { encode, decode } from "@msgpack/msgpack";
import { fromByteArray, toByteArray } from 'base64-js';

import { hasOwnProperty } from '../common/tsHelpers';
import {
  FilterSetting,
  FilterType,
  OrderSetting,
  Printable,
  SortDirection
} from './interfaces';

interface UrlState {
  filt: UrlFilter[]
  ord: UrlOrderSetting | null
}

interface UrlFilter {
  col: string
  type: FilterType
  val?: string
  items?: Printable[]
}

interface UrlOrderSetting {
  col: string
  dir: SortDirection
}

interface DecodeResult {
  filters: FilterSetting[],
  orderSetting: OrderSetting
}

export function encodeState(currentFilters: FilterSetting[], currentOrderSetting: OrderSetting): string {
  const compactFilters: UrlFilter[] =
    currentFilters
    .filter(filter => filter.isAdHoc && filter.enabled)
    .map(filter => ({
      col: filter.column,
      type: filter.type,
      val: filter.filterValue || undefined,
      items: filter.filterItemValues || undefined
    }));

  const compactOrder: UrlOrderSetting | null =
    currentOrderSetting.column
      ? { col: currentOrderSetting.column, dir: currentOrderSetting.direction }
      : null;

  const compact: UrlState = {
    filt: compactFilters,
    ord: compactOrder
  };

  const encoded: Uint8Array = encode(compact);
  const base64 = fromByteArray(encoded);

  return base64;
}

export function decodeState(state: string): DecodeResult {
  const stateBytes: Uint8Array = toByteArray(state);
  const message = decode(stateBytes);

  if (!isMessageObject(message)) {
    throw new TypeError('State is not formatted correctly');
  }

  if (!isUrlOrderSetting(message.ord)) {
    throw new TypeError('Order setting is not formatted correctly');
  }

  const orderSetting: OrderSetting | null =
    message.ord === null
      ? { column: null, direction: 'asc' }
      : { column: message.ord.col, direction: message.ord.dir };

  return {
    filters: message.filt
      .map(compactFilter => {
        if (isUrlFilter(compactFilter)) {
          return expandFilter(compactFilter);
        } else {
          throw new TypeError('Filter is not formatted correctly');
        }
      }),
    orderSetting
  };
}

function expandFilter(compactFilter: UrlFilter): FilterSetting {
  const { col, type, val, items } = compactFilter;

  return {
    id: 1,
    enabled: true,
    column: col,
    type,
    filterValue: val || undefined,
    filterItemValues: items || undefined,
    isAdHoc: true
  }
}

function isMessageObject(message: unknown): message is {filt: {}[], ord: {} | null } {
  if (typeof message !== 'object' || message === null) {
    return false;
  }

  if (!hasOwnProperty(message, 'filt') || !Array.isArray(message.filt)) {
    return false;
  }

  if (!hasOwnProperty(message, 'ord') || typeof message.ord !== 'object') {
    return false;
  }

  return true;
}

function isUrlFilter(compactFilter: unknown): compactFilter is UrlFilter {
  if (typeof compactFilter !== 'object' || compactFilter === null) {
    return false;
  }

  if (!hasOwnProperty(compactFilter, 'col') || typeof compactFilter.col !== 'string') {
    return false;
  }

  if (!hasOwnProperty(compactFilter, 'type') || !isFilterType(compactFilter.type)) {
    return false;
  }

  if (!hasOwnProperty(compactFilter, 'val') && !hasOwnProperty(compactFilter, 'items')) {
    return false;
  }

  return true;
}

function isUrlOrderSetting(compactOrderSetting: unknown): compactOrderSetting is UrlOrderSetting {
  if (typeof compactOrderSetting !== 'object') {
    return false;
  }

  if (compactOrderSetting === null) {
    return true;
  }

  if (!hasOwnProperty(compactOrderSetting, 'col') || typeof compactOrderSetting.col !== 'string') {
    return false;
  }

  if (!hasOwnProperty(compactOrderSetting, 'dir') || !isSortDirection(compactOrderSetting.dir)) {
    return false;
  }

  return true;
}

function isSortDirection(sortDirection: unknown): sortDirection is SortDirection {
  if (typeof sortDirection !== 'string') {
    return false;
  }

  return [
    'asc',
    'desc'
  ].includes(sortDirection);
}

function isFilterType(filterType: unknown): filterType is FilterType {
  if (typeof filterType !== 'string') {
    return false;
  }

  return [
    'contains',
    'regex',
    'equals',
    'equalsList'
  ].includes(filterType);
}

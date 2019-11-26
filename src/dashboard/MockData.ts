import uuidv4 from 'uuid/v4';
import {
  Dataset
} from '../common/interfaces';
import {
  DataHeader,
  DataRow,
  FilterSetting,
  OrderSetting
} from './interfaces';

const ROW_COUNT = 1000;
const COLORS = [
  'red',
  'yellow',
  'blue',
  'green',
  'orange',
  'violet'
];
const SHAPES = [
  'square',
  'triangle',
  'circle',
  'pentagon'
];

function randomItem<T>(arr: Array<T>): T {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomBoolean(): boolean {
  return Math.random() >= 0.5;
}

function range(max: number): number[] {
  const numbers = [];
  for (let i = 0; i < max; i++) {
    numbers.push(i);
  }
  return numbers;
}

function generateRow(): DataRow {
  return {
    id: uuidv4(),
    cells: {
      color: randomItem(COLORS),
      shape: randomItem(SHAPES),
      size: randomBetween(20, 100),
      deluxe: randomBoolean(),
    }
  };
}

export const MOCK_DATA: DataRow[] =
  range(ROW_COUNT)
  .map(() => generateRow());

export const HEADERS: DataHeader[] = [
  {
    id: 'color',
    title: 'Color'
  },
  {
    id: 'shape',
    title: 'Shape'
  },
  {
    id: 'size',
    title: 'Size'
  },
  {
    id: 'deluxe',
    title: 'Deluxe?'
  }
];

export const INITIAL_FILTERS: FilterSetting[] = [
  {
    id: 1,
    column: 'color',
    filterValue: 'blue',
    enabled: false
  },
  {
    id: 2,
    column: 'color',
    filterValue: 'red',
    enabled: false
  },
  {
    id: 3,
    column: 'shape',
    filterValue: 'circle',
    enabled: false
  },
  {
    id: 4,
    column: 'deluxe',
    filterValue: 'true',
    enabled: false
  }
];

export const INITIAL_ORDER_SETTING: OrderSetting = {
  column: 'color',
  direction: 'asc'
}

export const MOCK_DATASET: Dataset = {
  id: 'MOCK_DATASET',
  headers: HEADERS,
  rows: MOCK_DATA
};

import {
  FilterType
} from '../interfaces';

export const FILTER_TYPES: { type: FilterType, label: string }[] = [
  {
    type: 'contains',
    label: 'contains'
  },
  {
    type: 'equals',
    label: 'equals'
  },
  {
    type: 'regex',
    label: 'matches regex'
  }
];

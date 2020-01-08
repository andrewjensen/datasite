import {
  FilterType
} from '../interfaces';

export const FILTER_TYPES: { type: FilterType, label: string }[] = [
  {
    type: 'equalsList',
    label: 'equals values'
  },
  {
    type: 'equals',
    label: 'equals the string'
  },
  {
    type: 'contains',
    label: 'contains the string'
  },
  {
    type: 'regex',
    label: 'matches regex'
  },
];

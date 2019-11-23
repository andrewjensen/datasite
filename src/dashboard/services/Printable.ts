import { Printable } from '../interfaces';

export function printValue(item: Printable): string {
  if (typeof item == 'string') {
    return item;
  } else {
    return `${item}`;
  }
}

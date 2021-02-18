import { FilterSetting, OrderSetting } from './interfaces';
import { encodeState, decodeState } from './urlState';

describe('encodeState', () => {
  it('serializes filters and order setting', () => {
    const filters: FilterSetting[] = [
      {
        id: 1,
        enabled: true,
        column: 'color',
        type: 'equalsList',
        filterItemValues: ['blue', 'green'],
        isAdHoc: true
      }
    ];
    const orderSetting: OrderSetting = {
      column: 'shape',
      direction: 'asc'
    };
    const result = encodeState(filters, orderSetting);

    expect(result).toEqual('gqRmaWx0kYSjY29spWNvbG9ypHR5cGWqZXF1YWxzTGlzdKN2YWzApWl0ZW1zkqRibHVlpWdyZWVuo29yZIKjY29spXNoYXBlo2RpcqNhc2M=');
  });
});

describe('decodeState', () => {
  it('deserializes the string into filters and order settings', () => {
    const input = 'gqRmaWx0kYSjY29spWNvbG9ypHR5cGWqZXF1YWxzTGlzdKN2YWzApWl0ZW1zkqNyZWSmeWVsbG93o29yZIKjY29spXNoYXBlo2RpcqRkZXNj';
    const { filters, orderSetting } = decodeState(input);

    expect(filters).toEqual([
      {
        id: 1,
        enabled: true,
        column: 'color',
        type: 'equalsList',
        filterItemValues: ['red', 'yellow'],
        isAdHoc: true
      }
    ]);
    expect(orderSetting).toEqual({
      column: 'shape',
      direction: 'desc'
    });
  });
});

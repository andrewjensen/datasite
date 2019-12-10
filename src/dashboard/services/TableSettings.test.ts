import {
  DataRow, FilterSetting, OrderSetting
} from '../interfaces';
import {
  applyFilters,
  applyOrdering
} from './TableSettings';

const SAMPLE_DATA: DataRow[] = [
  {
    id: './widget/interfaces.js',
    cells: {
      name: './widget/interfaces.js',
      loc: 86,
      hasFullLodashImport: false
    }
  },
  {
    id: './users/queries/currentUserQuery.js',
    cells: {
      name: './users/queries/currentUserQuery.js',
      loc: 27,
      hasFullLodashImport: false
    }
  },
  {
    id: './widget/WidgetMenu.js',
    cells: {
      name: './widget/WidgetMenu.js',
      loc: 147,
      hasFullLodashImport: true
    }
  },
  {
    id: './widget/WidgetMenuItem.js',
    cells: {
      name: './widget/WidgetMenuItem.js',
      loc: 94,
      hasFullLodashImport: false
    }
  }
];

describe('applyFilters', () => {
  it('should filter rows based on a "contains" filter type', () =>  {
    const filters: FilterSetting[] = [
      {
        id: 1,
        column: 'name',
        type: 'contains',
        filterValue: 'Menu',
        enabled: true
      }
    ];
    const result = applyFilters(SAMPLE_DATA, filters);
    expect(result).toEqual([
      {
        id: './widget/WidgetMenu.js',
        cells: {
          name: './widget/WidgetMenu.js',
          loc: 147,
          hasFullLodashImport: true
        }
      },
      {
        id: './widget/WidgetMenuItem.js',
        cells: {
          name: './widget/WidgetMenuItem.js',
          loc: 94,
          hasFullLodashImport: false
        }
      }
    ]);
  });

  it('should filter rows based on an "equals" filter type', () => {
    const filters: FilterSetting[] = [
      {
        id: 1,
        column: 'name',
        type: 'equals',
        filterValue: 'Menu',
        enabled: true
      }
    ];
    const result = applyFilters(SAMPLE_DATA, filters);
    expect(result).toEqual([]);
  });

  it('should filter rows based on a "regex" filter type', () => {
    const filters: FilterSetting[] = [
      {
        id: 1,
        column: 'name',
        type: 'regex',
        filterValue: '(interface|Query)',
        enabled: true
      }
    ];
    const result = applyFilters(SAMPLE_DATA, filters);
    expect(result).toEqual([
      {
        id: './widget/interfaces.js',
        cells: {
          name: './widget/interfaces.js',
          loc: 86,
          hasFullLodashImport: false
        }
      },
      {
        id: './users/queries/currentUserQuery.js',
        cells: {
          name: './users/queries/currentUserQuery.js',
          loc: 27,
          hasFullLodashImport: false
        }
      }
    ]);
  });

  it('should apply multiple filters', () => {
    const filters: FilterSetting[] = [
      {
        id: 1,
        column: 'name',
        type: 'contains',
        filterValue: 'Menu',
        enabled: true
      },
      {
        id: 1,
        column: 'hasFullLodashImport',
        type: 'contains',
        filterValue: 'true',
        enabled: true
      }
    ];
    const result = applyFilters(SAMPLE_DATA, filters);
    expect(result).toEqual([
      {
        id: './widget/WidgetMenu.js',
        cells: {
          name: './widget/WidgetMenu.js',
          loc: 147,
          hasFullLodashImport: true
        }
      }
    ]);
  });
});

describe('applyOrdering', () => {
  it('should order rows ascending based on a string column', () => {
    const orderSetting: OrderSetting = {
      column: 'name',
      direction: 'asc'
    };
    const result = applyOrdering(SAMPLE_DATA, orderSetting);
    expect(result).toEqual([
      {
        id: './users/queries/currentUserQuery.js',
        cells: {
          name: './users/queries/currentUserQuery.js',
          loc: 27,
          hasFullLodashImport: false
        }
      },
      {
        id: './widget/interfaces.js',
        cells: {
          name: './widget/interfaces.js',
          loc: 86,
          hasFullLodashImport: false
        }
      },
      {
        id: './widget/WidgetMenu.js',
        cells: {
          name: './widget/WidgetMenu.js',
          loc: 147,
          hasFullLodashImport: true
        }
      },
      {
        id: './widget/WidgetMenuItem.js',
        cells: {
          name: './widget/WidgetMenuItem.js',
          loc: 94,
          hasFullLodashImport: false
        }
      }
    ]);
  });

  it('should order rows descending based on a string column', () => {
    const orderSetting: OrderSetting = {
      column: 'name',
      direction: 'desc'
    };
    const result = applyOrdering(SAMPLE_DATA, orderSetting);
    expect(result).toEqual([
      {
        id: './widget/WidgetMenuItem.js',
        cells: {
          name: './widget/WidgetMenuItem.js',
          loc: 94,
          hasFullLodashImport: false
        }
      },
      {
        id: './widget/WidgetMenu.js',
        cells: {
          name: './widget/WidgetMenu.js',
          loc: 147,
          hasFullLodashImport: true
        }
      },
      {
        id: './widget/interfaces.js',
        cells: {
          name: './widget/interfaces.js',
          loc: 86,
          hasFullLodashImport: false
        }
      },
      {
        id: './users/queries/currentUserQuery.js',
        cells: {
          name: './users/queries/currentUserQuery.js',
          loc: 27,
          hasFullLodashImport: false
        }
      }
    ]);
  });

  it('should order rows ascending based on a numeric column', () => {
    const orderSetting: OrderSetting = {
      column: 'loc',
      direction: 'asc'
    };
    const result = applyOrdering(SAMPLE_DATA, orderSetting);
    expect(result).toEqual([
      {
        id: './users/queries/currentUserQuery.js',
        cells: {
          name: './users/queries/currentUserQuery.js',
          loc: 27,
          hasFullLodashImport: false
        }
      },
      {
        id: './widget/interfaces.js',
        cells: {
          name: './widget/interfaces.js',
          loc: 86,
          hasFullLodashImport: false
        }
      },
      {
        id: './widget/WidgetMenuItem.js',
        cells: {
          name: './widget/WidgetMenuItem.js',
          loc: 94,
          hasFullLodashImport: false
        }
      },
      {
        id: './widget/WidgetMenu.js',
        cells: {
          name: './widget/WidgetMenu.js',
          loc: 147,
          hasFullLodashImport: true
        }
      }
    ]);
  });

  it('should order rows descending based on a numeric column', () => {
    const orderSetting: OrderSetting = {
      column: 'loc',
      direction: 'desc'
    };
    const result = applyOrdering(SAMPLE_DATA, orderSetting);
    expect(result).toEqual([
      {
        id: './widget/WidgetMenu.js',
        cells: {
          name: './widget/WidgetMenu.js',
          loc: 147,
          hasFullLodashImport: true
        }
      },
      {
        id: './widget/WidgetMenuItem.js',
        cells: {
          name: './widget/WidgetMenuItem.js',
          loc: 94,
          hasFullLodashImport: false
        }
      },
      {
        id: './widget/interfaces.js',
        cells: {
          name: './widget/interfaces.js',
          loc: 86,
          hasFullLodashImport: false
        }
      },
      {
        id: './users/queries/currentUserQuery.js',
        cells: {
          name: './users/queries/currentUserQuery.js',
          loc: 27,
          hasFullLodashImport: false
        }
      }
    ]);
  });
});

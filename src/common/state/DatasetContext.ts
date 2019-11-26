import React from 'react';

import { Dataset } from '../interfaces';

interface DatasetContextContent {
  loading: boolean
  dataset: Dataset | null
}

const DatasetContext = React.createContext<DatasetContextContent>({
  loading: true,
  dataset: null
});

export default DatasetContext;

import React from 'react';

import { Manifest } from '../interfaces';

interface ManifestContextContent {
  loading: boolean
  manifest: Manifest | null
}

const ManifestContext = React.createContext<ManifestContextContent>({
  loading: true,
  manifest: null
});

export default ManifestContext;

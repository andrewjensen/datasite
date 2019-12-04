import React, { useState, useEffect } from 'react';

import ManifestContext from '../state/ManifestContext';
import { Manifest } from '../interfaces';
import MOCK_MANIFEST from './MockManifest';

const MANIFEST_URL = 'datasite.manifest.json';

const ManifestProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [manifest, setManifest] = useState<Manifest | null>(null);

  useEffect(() => {
    fetchManifest()
      .then(fetchedManifest => {
        setLoading(false);
        setManifest(fetchedManifest);
      });
  }, []);

  return (
    <ManifestContext.Provider value={{
      loading: loading,
      manifest: manifest
    }}>
      {children}
    </ManifestContext.Provider>
  );
};

export default ManifestProvider;

async function fetchManifest(): Promise<Manifest> {
  if (process.env.NODE_ENV !== 'development') {
    return fetch(MANIFEST_URL)
      .then(response => response.json())
      .then(json => {
        if (isManifest(json)) {
          return json;
        } else {
          throw new Error('Invalid manifest file');
        }
      });
  } else {
    return Promise.resolve(MOCK_MANIFEST);
  }
}

// TODO: replace with generic-type-guard library
function isManifest(json: any): json is Manifest {
  if (
    json.general
    && json.general.title
    && typeof json.general.title === 'string'
    && json.dashboards) {
    return true;
  } else {
    return false;
  }
}

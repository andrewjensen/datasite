import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import DashboardView from './DashboardView';
import { Dataset } from '../common/interfaces';
import { MOCK_DATASET } from './MockData';
import ManifestContext from '../common/state/ManifestContext';
import DatasetContext from '../common/state/DatasetContext';

const Dashboard: React.FC = () => {
  const { dashboardSlug } = useParams();
  const { manifest } = useContext(ManifestContext);
  const dashboard = manifest
    ? manifest.dashboards.find(d => d.slug === dashboardSlug) || null
    : null;
  const [dataset, setDataset] = useState<Dataset | null>(null);

  useEffect(() => {
    if (dashboard) {
      console.log('fetching for dashboard:', dashboard);
      fetchDataset(dashboard.dataset)
        .then(fetchedDataset => {
          setDataset(fetchedDataset);
        });
    }
  }, [dashboard]);

  const context = {
    dataset,
    loading: !dataset
  };

  if (dataset && dashboard) {
    return (
      <DatasetContext.Provider value={context}>
        <DashboardView
          dashboard={dashboard}
        />
      </DatasetContext.Provider>
    );
  } else {
    return (
      <LoadingMessage>
        Loading...
      </LoadingMessage>
    );
  }
}

export default Dashboard;

async function fetchDataset(datasetId: string): Promise<Dataset> {
  const url = `dataset-${datasetId}.json`;
  if (process.env.NODE_ENV !== 'development') {
    return fetch(url, { cache: 'no-store' })
      .then(response => response.json())
      .then(json => {
        if (isDataset(json)) {
          return json;
        } else {
          throw new Error('Invalid manifest file');
        }
      });
  } else {
    return Promise.resolve(MOCK_DATASET);
  }
}

// TODO: replace with generic-type-guard library
function isDataset(json: any): json is Dataset {
  if (
    json.id &&
    json.headers &&
    json.rows
  ) {
    return true;
  } else {
    return false;
  }
}

const LoadingMessage = styled.div`
  margin: 5rem 0;
  text-align: center;
  font-size: 20px;
`;

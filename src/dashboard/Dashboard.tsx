import React from 'react';
import { useParams } from 'react-router-dom';

import DashboardView from './DashboardView';

const Dashboard: React.FC = () => {
  const { dashboardSlug } = useParams();

  return (
    <DashboardView
      dashboardSlug={dashboardSlug || ''}
    />
  );
}

export default Dashboard;

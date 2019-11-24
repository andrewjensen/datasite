import { FilterSetting } from '../dashboard/interfaces';

export interface Manifest {
  general: {
    title: string,
    description: string
  },
  dashboards: ManifestDashboard[]
}

export interface ManifestDashboard {
  title: string,
  slug: string,
  description: string,
  dataset: string,
  filters: FilterSetting[]
}

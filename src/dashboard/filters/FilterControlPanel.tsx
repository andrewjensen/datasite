import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import { DataHeader } from '../interfaces';
import FilterPill from './FilterPill';
import FilterSettingsDialog from './FilterSettingsDialog';
import FilterContext from './FilterContext';

interface Props {
  displayedRowCount: number
  totalRowCount: number
  headers: DataHeader[]
}

const FilterControlPanel: React.FC<Props> = ({
  displayedRowCount,
  totalRowCount,
  headers
}) => {
  const { filters, onToggleFilter } = useContext(FilterContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Container>
      {isModalOpen && (
        <FilterSettingsDialog
          headers={headers}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <FilterSection>
        <PillsContainer>
          {filters.map(filter => (
            <FilterPill
              key={filter.id}
              filter={filter}
              onToggle={() => onToggleFilter(filter.id)}
            ></FilterPill>
          ))}
        </PillsContainer>
        <ControlsContainer>

          <Button
            variant="contained"
            color="default"
            startIcon={<FilterListIcon />}
            onClick={() => setIsModalOpen(true)}
          >Edit Filters</Button>

        </ControlsContainer>
      </FilterSection>

      <Summary>
        {getSummaryText(displayedRowCount, totalRowCount)}
      </Summary>
    </Container>
  );
}

export default FilterControlPanel;

function getSummaryText(displayedRowCount: number, totalRowCount: number): string {
  if (displayedRowCount === totalRowCount) {
    return `Displaying ${totalRowCount} rows`;
  } else {
    return `Displaying ${displayedRowCount} of ${totalRowCount} rows (${totalRowCount - displayedRowCount} hidden by filters)`;
  }
}

const Container = styled.div`
  margin: 1rem 0;
  padding: 0 2rem;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const Summary = styled.p`
  margin: 1rem 0;
`;

const PillsContainer = styled.div`
  flex-grow: 1;
`;

const ControlsContainer = styled.div`

`;

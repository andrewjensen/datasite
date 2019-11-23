import React from 'react';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { FilterSetting } from '../interfaces';

interface Props {
  filter: FilterSetting
  onToggle: () => void
}

const FilterPill: React.FC<Props> = ({ filter, onToggle }) => (
  <Container>
    <StyledChip
      variant="outlined"
      label={getPillLabel(filter)}
      onClick={onToggle}
      avatar={<Icon enabled={filter.enabled} />}
    />
  </Container>
);

export default FilterPill;

const Container = styled.div`
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StyledChip = styled(Chip)`
`;

interface IconProps {
  enabled: boolean
}

const Icon: React.FC<IconProps> = ({ enabled }) => (
  <IconContainer>
    {enabled
      ? (<CheckCircleIcon />)
      : (<RadioButtonUncheckedIcon />)}
  </IconContainer>
)

const IconContainer = styled.div`
  margin-top: 3px;
  margin-left: 4px;
`;

function getPillLabel(filter: FilterSetting) {
  return `${filter.column} =~ "${filter.filterValue}"`;
}

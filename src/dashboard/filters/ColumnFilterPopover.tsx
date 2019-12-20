import React from 'react';
import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

interface ColumnFilterPopoverProps {
  open: boolean
  onClose: () => void
  anchorEl: Element | null
}

const ColumnFilterPopover: React.FC<ColumnFilterPopoverProps> = ({
  open,
  onClose,
  anchorEl
}) => {
  function onClickApply() {
    // TODO: implement
    onClose();
  }

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Paper>
        <Container>
          <div>Apply filters</div>
          <div>[input]</div>
          <div>
            <Button
              size="small"
              color="primary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={onClickApply}
            >
              Apply
            </Button>
          </div>
        </Container>
      </Paper>
    </Popover>
  )
};

export default ColumnFilterPopover;

const Container = styled.div`
  padding: 0.5rem 1rem;
`;

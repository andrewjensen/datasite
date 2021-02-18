import React, { forwardRef, ReactNode } from 'react';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core';

interface Props {
  children: ReactNode
  active: boolean
  onClick: () => void
}

type Ref = HTMLDivElement;

const DashboardTableHeadButton = forwardRef<Ref, Props>(({ active, onClick, children }, ref) => {
  const theme = useTheme();

  let colors;
  if (active) {
    colors = {
      fg: theme.palette.common.white,
      bg: theme.palette.primary.main,
      bgHover: theme.palette.primary.main
    };
  } else {
    colors = {
      fg: theme.palette.text.primary,
      bg: 'transparent',
      bgHover: 'rgba(0, 0, 0, 0.2)'
    };
  }

  return (
    <ButtonContainer
      colors={colors}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </ButtonContainer>
  );
});

export default DashboardTableHeadButton;

interface ContainerProps {
  colors: {
    fg: string
    bg: string
    bgHover: string
  }
}

const ButtonContainer = styled.div<ContainerProps>`
  display: inline-block;
  box-sizing: border-box;
  height: 24px;
  width: 24px;
  margin-right: 4px;
  padding-top: 3px;
  border-radius: 999px;
  color: ${(props) => props.colors.fg}
  background-color: ${(props) => props.colors.bg};
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  transition: all ease-in-out 0.15s;

  &:hover {
    opacity: 0.8;
    background-color: ${(props) => props.colors.bgHover};
  }
`;

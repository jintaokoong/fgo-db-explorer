import styled from 'styled-components';
import Layout from 'constants/layout';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  hasHeader?: boolean;
  hasFooter?: boolean;
}

export const Body = styled.main`
  position: absolute;
  top: ${(props: Props) =>
    props.hasHeader ? `calc(${Layout.header.height} + 1px)` : 0};
  height: ${(props: Props) =>
    `calc(100vh - ${props.hasHeader ? '51px' : '0px'} - ${
      props.hasFooter ? '51px' : '0px'
    })`};
  width: 100%;
  overflow-y: auto;
`;

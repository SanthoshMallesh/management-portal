import React, { ReactElement } from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -20px;
  margin-top: -20px;
  display: block;
  text-align: center;
`;

export default function Loader(): ReactElement {
  return (
    <LoaderWrapper className="spinner-border text-primary">
      <span className="sr-only">Loading...</span>
    </LoaderWrapper>
  );
}

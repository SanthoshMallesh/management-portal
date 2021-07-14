import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface IconProps {
  width?: number;
  height?: number;
  size?: number;
}

const IconPath = styled.path`
  fill: #003da6;
`;

export default function ArrawCircleUp({ width, height, size }: IconProps): ReactElement {
  const iconWidth = size || width || 24;
  const iconHeight = size || width || 24;

  return (
    <svg xmlns="" width={iconWidth} height={iconHeight} viewBox="0 0 29.344 29.346">
      <g transform="translate(-0.021)">
        <IconPath
          d="M14.684,0A14.673,14.673,0,1,0,29.356,14.673,14.689,14.689,0,0,0,14.684,0Zm7.955,18.53a1.072,0,0,1,-1.518,0l-6.438-6.437L8.247,18.53a1.074,1.074,0,0,1,-1.519-1.518l7.2-7.2a1.072,1.072,0,0,1,1.517,0l7.2,7.2A1.073,1.073,0,0,1,22.639,18.53Z"
          transform="translate(0)"
        />
      </g>
    </svg>
  );
}

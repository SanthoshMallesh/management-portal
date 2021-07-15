import React, { Fragment, ReactElement } from 'react';

import { v4 as uuidv4 } from 'uuid';
import ReactTooltip from 'react-tooltip';

interface TooltipProps {
  content: ReactElement | string;
  children: (props: { 'data-for'?: string; 'data-tip'?: boolean }) => ReactElement;
  place?: 'top' | 'right' | 'bottom' | 'left';
  type?: 'dark' | 'success' | 'warning' | 'error' | 'info' | 'light';
}

export default function Tooltip(props: TooltipProps): ReactElement {
  if (!props.content) {
    return props.children({});
  }

  const tooltipId = `tooltip-${uuidv4()}`;

  return (
    <Fragment>
      {props.children({ 'data-for': tooltipId, 'data-tip': true })}
      <ReactTooltip
        id={tooltipId}
        className="font-weight-normal custom-tooltip text-center"
        place={props.place || 'right'}
        effect="solid"
        type={props.type}
      >
        {typeof props.content === 'string' ? (
          <span dangerouslySetInnerHTML={{ __html: props.content }} />
        ) : (
          props.content
        )}
      </ReactTooltip>
    </Fragment>
  );
}

import React, { ReactElement, HTMLProps } from 'react';

interface IconProps extends HTMLProps<HTMLDListElement> {
  icon: string;
}

export default function Icon({ icon, ...rest }: IconProps): ReactElement {
  return (
    <span {...rest}>
      <span className={`icon icon-2x icon-${icon}`} />
    </span>
  );
}

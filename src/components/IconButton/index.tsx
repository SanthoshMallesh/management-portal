import React, { ReactElement, ButtonHTMLAttributes } from 'react';
import Styles from './Styles';

export default function IconButton(props: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement {
  const { children, type, ...rest } = props;

  return (
    <Styles.IconButton type={type || 'button'} {...rest}>
      {children}
    </Styles.IconButton>
  );
}

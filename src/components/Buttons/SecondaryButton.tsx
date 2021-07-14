import React, { ReactElement, ButtonHTMLAttributes } from 'react';

import styled from 'styled-components';

import { StyleProps } from '../../constants/Theme';

/* Custom Interface */
type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { size?: string };

const Button = styled.button`
  color: ${(props: StyleProps<SecondaryButtonProps>): string => props.theme.color.text.secondary};
  background: ${(props: StyleProps<SecondaryButtonProps>): string => props.theme.color.bg.secondary};
  min-width: 95px;
  font-weight: 600;
  font-size: ${(props: StyleProps<SecondaryButtonProps>): string => props.theme.fontSize[props.size || 'xs']};
  line-height: 24px;
  padding: 0.25rem 1.5rem;
  border: 1px solid transparent;
  border-color: ${(props: StyleProps<SecondaryButtonProps>): string => props.theme.color.text.secondary};
  outline: none !important;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0, 15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  &:hover {
    color: ${(props: StyleProps<SecondaryButtonProps>): string => props.theme.color.text.secondaryHover};
    background: ${(props: StyleProps<SecondaryButtonProps>): string => props.theme.color.bg.secondaryHover};
  }
`;

export default function SecondaryButton(props: SecondaryButtonProps): ReactElement {
  const { children, type, ...rest } = props;

  return (
    <Button type={type || 'button'} {...rest}>
      {children}
    </Button>
  );
}

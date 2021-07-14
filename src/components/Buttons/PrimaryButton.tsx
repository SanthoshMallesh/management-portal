import React, { ReactElement, ButtonHTMLAttributes } from 'react';

import styled from 'styled-components';

import { StyleProps } from '../../constants/Theme';

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { size?: string };

const Button = styled.button`
  color: ${(props: StyleProps<PrimaryButtonProps>): string => props.theme.color.text.themeAlt};
  background: ${(props: StyleProps<PrimaryButtonProps>): string => props.theme.color.bg.themeAlt};
  min-width: 95px;
  font-weight: 600;
  font-size: ${(props: StyleProps<PrimaryButtonProps>): string => props.theme.fontSize[props.size || 'xs']};
  line-height: 24px;
  padding: 0.25rem 1.5rem;
  border: 1px solid transparent;
  border-color: ${(props: StyleProps<PrimaryButtonProps>): string => props.theme.color.bg.primary};
  outline: none !important;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0, 15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  &:hover {
    background: ${(props: StyleProps<PrimaryButtonProps>): string => props.theme.color.bg.primaryAltHover};
  }

  &:disabled {
    background: ${(props: StyleProps<PrimaryButtonProps>): string => props.theme.color.bg.primaryDisabled};
    opacity: 0.65;
    border-color: ${(props: StyleProps<PrimaryButtonProps>): string => props.theme.color.bg.primaryDisabled};
  }
`;

export default function PrimaryButton(props: PrimaryButtonProps): ReactElement {
  const { children, type, ...rest } = props;

  return (
    <Button type={type || 'button'} {...rest}>
      {children}
    </Button>
  );
}

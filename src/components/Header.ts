import { PropsWithChildren, ReactElement } from 'react';
import { APPS } from '../constants/App';

interface HeaderProps {
  app?: APPS;
  user?: {
    name: string;
    email: string;
    roles: string[];
  };
  logout: () => void;
  activeApp?: APPS;
}
export default function Header({
  children,
  app,
  logout,
  user,
  activeApp,
}: PropsWithChildren<HeaderProps>): ReactElement;
export {};

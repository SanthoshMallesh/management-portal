import React, { PropsWithChildren, ReactElement } from 'react';

import BackToTop from '../BackToTop';

import UserMenu from '@components/UserMenu';
import Logo from '@components/Logo';
import { APPS } from '../../constants/App';

import Styles from './Styles';

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
}: PropsWithChildren<HeaderProps>): ReactElement {
  return (
    <Styles.NavBar>
      <BackToTop />
      <Logo app={app} />
      <Styles.EmptySpace />
      {children}

      <UserMenu
        className="nav-menu"
        name={user && user.name ? user.name : 'REPORT'}
        email={user && user.email ? user.email : 'unknown'}
        logout={logout}
      />
    </Styles.NavBar>
  );
}

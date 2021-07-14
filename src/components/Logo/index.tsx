import React, { ReactElement } from 'react';

import { appList, APPS } from '../../constants/App';
import Styles from './Styles';
import BrandLogo from '@components/BrandLogo';

interface LogoProps {
  app?: APPS;
}

export default function Logo(props: LogoProps): ReactElement | null {
  const { app } = props;

  const appDetails = app && appList.find(appDetails => (appDetails ? appDetails.url : '/'));

  return (
    <Styles.Logo title={appDetails ? appDetails.title : 'LogoTitle'} href={appDetails ? appDetails.url : '/'}>
      <BrandLogo />
      {appDetails && <Styles.LogoTitle>{appDetails.title}</Styles.LogoTitle>}
    </Styles.Logo>
  );
}

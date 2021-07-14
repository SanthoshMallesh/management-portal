import React, { ReactElement, Fragment } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

/**
 * Components
 */
import ErrorBoundary from '../components/ErrorBoundary';
import Header from '../components/Header';
import theme from '../constants/Theme';
import { useSelector } from 'react-redux';
import { ReducersState } from '../reducers/index';
import { logout } from '../utils/helper';
import { APPS } from '../constants/App';
import NavTab from '../components/NavTab';

interface LayoutProps extends RouteProps {
  component?: any; //eslint-disable-line
}

export default function Layout(props: LayoutProps): ReactElement {
  const { component: Component, ...rest } = props;

  const render = (matchProps: Record<string, unknown>): ReactElement => (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        {/* <Header
          logout={logout}
          activeApp={APPS.CMP}
          app={APPS.CMP_REPORT}
          user={{ name: 'santhosh', email: 'santhosh@gmail.com', roles: ['admin'] }}
        /> */}
        <NavTab />
        <Fragment>
          <div style={{ background: '#F4F4F4', width: '100%', minHeight: '100vh' }}>
            <Component {...matchProps} />
          </div>
        </Fragment>
      </ErrorBoundary>
    </ThemeProvider>
  );

  return <Route {...rest} render={render} />;
}

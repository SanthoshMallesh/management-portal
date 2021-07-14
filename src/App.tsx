import React, { ReactElement, Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';
import HistoryRouter from '@components/HistoryRouter';
import DashboardLayout from './containers/Layout';
import Loader from './components/Loader';
import { PUBLIC_PATH } from './constants/Config';
import './assets/css/main.pcss';

const Reports = lazy(() => import('./containers/Reports'));

export default function App(): ReactElement {
  return (
    <HistoryRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
          <DashboardLayout component={Reports} />
        </Switch>
      </Suspense>
    </HistoryRouter>
  );
}

import React, { PropsWithChildren, ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import browserHistory from './browserHistory';

export default function HistoryRouter(props: PropsWithChildren<unknown>): ReactElement {
  return <Router history={browserHistory}>{props.children}</Router>;
}

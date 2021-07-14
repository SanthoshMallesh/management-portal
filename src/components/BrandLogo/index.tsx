import React, { Fragment, ReactElement } from 'react';
import Styles from './Styles';
import logo from './logo.jpg';

export default function BrandLogo(): ReactElement {
  return (
    <Fragment>
      <Styles.BrandImage src={logo} />
      <Styles.BrandTitle>BrandTitle</Styles.BrandTitle>
    </Fragment>
  );
}

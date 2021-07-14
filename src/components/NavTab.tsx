import React, { ReactElement } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { PUBLIC_PATH } from '../constants/Config';

const Tabs = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 9%);
`;

const TabItem = styled(Link)<{ active: boolean }>`
  display: inline-block;
  padding: 5px 10px 5px;
  color: #2f3540;
  font-size: 18px;
  font-weifgt: 500;
  margin-right: 20px;
  text-decoration: none !important;

  ${(props): false | FlattenSimpleInterpolation =>
    props.active &&
    css`
      color: #003da6;
      font-weight: 600;
      border-bottom: 3px solid;
    `}
`;

export default function NavTab(): ReactElement {
  const location = useLocation();

  const isReportsPage = location.pathname === `${PUBLIC_PATH}reports`;

  return (
    <Tabs>
      <div className="container-fluid">
        <TabItem to={`${PUBLIC_PATH}`} active={!isReportsPage}>
          Dashboard
        </TabItem>
        <TabItem to={`${PUBLIC_PATH}reports`} active={isReportsPage}>
          Reports
        </TabItem>
      </div>
    </Tabs>
  );
}

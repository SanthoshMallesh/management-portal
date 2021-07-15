import React, { ReactElement, useEffect } from 'react';
import { ReducersState } from '../reducers/index';
import ReportsForm from '../Dashboard/Components/Tabs/DashboardTab/ReportsForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels } from '../actions/channels';
import { fetchFieldConfig } from '../actions/fieldConfig';
import Loader from '@components/Loader';

export default function Reports(): ReactElement {
  const dispatch = useDispatch();
  const isFetchingChannel = useSelector((state: ReducersState) => state.channels.isFetching);
  const isFetchingFieldConfig = useSelector((state: ReducersState) => state.fieldConfig.isFeatchingFieldConfig);

  useEffect(() => {
    dispatch(fetchFieldConfig());
    dispatch(fetchChannels());
  }, []);

  if (isFetchingChannel || isFetchingFieldConfig) {
    return <Loader />;
  }
  return (
    <div style={{ background: '#fff', padding: '40px 0', height: 185 }}>
      <ReportsForm />
    </div>
  );
}

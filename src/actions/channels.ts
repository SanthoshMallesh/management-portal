import actions from '../constants/ActionTypes';
import { endPoitns } from '@config';
import { AxiosInstance } from 'axios';
import { AnyAction } from 'redux';
import api from '../apiClient/index';
import { ReducersState } from '../reducers/index';

/**
 * Fetch Channels
 */
export function fetchChannels(): AnyAction {
  return {
    type: '',
    types: [actions.REQUEST_CHANNELS, actions.RECEIVE_CHANNELS, actions.FETCH_CHANNELS_FAIL],
    shouldCallAPI: (state: ReducersState): boolean => !state.channels.isFetching && state.channels.data.length === 0,
    callAPI: (): Promise<AxiosInstance> => api.get(endPoitns().channelsUrl),
  };
}

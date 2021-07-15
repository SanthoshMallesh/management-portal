import actions from '../constants/ActionTypes';
import { endPoitns } from '@config';
import { AxiosInstance } from 'axios';
import { AnyAction } from 'redux';
import api from '../apiClient/index';
import { ReducersState } from '../reducers/index';
import { statement } from '@babel/template';

/**
 * Fetch Channels
 */
export function fetchFieldConfig(): AnyAction {
  return {
    type: '',
    types: [actions.REQUEST_FIELD_CONFIG, actions.RECEIVE_FIELD_CONFIG, actions.FETCH_FIELD_CONFIG_FAIL],
    shouldCallAPI: (state: ReducersState): boolean =>
      !state.fieldConfig.isFeatchingFieldConfig && state.fieldConfig.data.length === 0,
    callAPI: (): Promise<AxiosInstance> => api.get(endPoitns().fieldConfigUrl),
  };
}

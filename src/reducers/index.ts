import channels, { ChannelsState } from './channels';
import { combineReducers } from 'redux';

export interface ReducersState {
  channels: ChannelsState;
}

const appReducer = combineReducers({ channels });

export default appReducer;

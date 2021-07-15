import channels, { ChannelsState } from './channels';
import fieldConfig, { FieldConfigState } from './fieldConfig';
import reportDetails, { ReportDetailsState } from './reportDetails';
import { combineReducers } from 'redux';

export interface ReducersState {
  fieldConfig: FieldConfigState;
  channels: ChannelsState;
  reportDetails: ReportDetailsState;
}

const appReducer = combineReducers({ fieldConfig, channels, reportDetails });

export default appReducer;

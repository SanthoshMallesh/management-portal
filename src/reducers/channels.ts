import actions from '../constants/ActionTypes';

export interface Channel {
  id: number;
  name: string;
  marketingProgram: { id: number; name: string; pgMpId: number; description: string };
  timeZone: { id?: number; timeZoneName?: string; timeZone?: string };
  currency: { code: string; id: number; name: string; symbol: string };
  locales: Array<{ id: number; name: string }>;
  country: { isoCode: string };
  reports: string[];
}

export interface ChannelsState {
  isFetching: boolean;
  data: Channel[];
}
export interface ChannelsAction {
  type: string;
  response: {
    data: Channel[];
  };
}

const defaultState = {
  isFetching: false,
  data: [],
};

export default function channels(state: ChannelsState = defaultState, action: ChannelsAction): ChannelsState {
  switch (action.type) {
    case actions.REQUEST_CHANNELS:
      return { ...state, isFetching: true };
    case actions.RECEIVE_CHANNELS:
      return { ...state, data: action.response.data, isFetching: false };
    case actions.FETCH_CHANNELS_FAIL:
      return { ...state, isFetching: false };
    default:
      return { ...state };
  }
}

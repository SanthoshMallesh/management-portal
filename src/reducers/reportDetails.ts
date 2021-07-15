import { AxiosResponse } from 'axios';
import actions from '../constants/ActionTypes';

type ReportType = 'campaign' | 'incentive' | 'pah' | 'ltc' | 'rsc' | 'voucher' | 'sample';

export interface ReportDetails {
  type: ReportType;
  isFetching: boolean;
  disabled?: number;
  expired?: number;
  paused?: number;
  published?: number;
  brand: Array<{ brand: string; count: number }>;
}

export interface ReportDetailsState {
  results: ReportDetails[];
  enableLoadingModal: boolean;
}

export interface ReportDetailsAction {
  type: string;
  payload: {
    distributionType: string;
    filterProps: {
      mpid: number;
      channel: number;
      dateRange: number;
    };
    reportType: ReportType;
  };
  response: AxiosResponse;
}

const defaultState = {
  results: [],
  enableLoadingModal: false,
};

export default function reportDetails(
  state: ReportDetailsState = defaultState,
  action: ReportDetailsAction,
): ReportDetailsState {
  switch (action.type) {
    case actions.ENABLE_LOADING_MODAL:
      return { ...state, enableLoadingModal: true };
    default:
      return { ...state };
  }
}

import actions from '../constants/ActionTypes';

export interface FieldConfig {
  id: number;
  mpId: string;
  area: string;
  field: string;
  properties: { validation: { maxNumber: number; minNumber: number; required: boolean; requiredforPublish: boolean } };
  multiLocale: boolean;
  hidden: boolean;
}

export interface FieldConfigAction {
  type: string;
  response: {
    data: FieldConfig[];
  };
}
export interface FieldConfigState {
  isFeatchingFieldConfig: boolean;
  data: FieldConfig[];
}

const defaultState = {
  isFeatchingFieldConfig: false,
  data: [],
};

export default function fieldConfig(
  state: FieldConfigState = defaultState,
  action: FieldConfigAction,
): FieldConfigState {
  switch (action.type) {
    case actions.REQUEST_FIELD_CONFIG:
      return { ...state, isFeatchingFieldConfig: true };
    case actions.RECEIVE_FIELD_CONFIG:
      return { ...state, data: action.response.data, isFeatchingFieldConfig: false };
    case actions.FETCH_FIELD_CONFIG_FAIL:
      return { ...state, isFeatchingFieldConfig: false };
    default:
      return { ...state };
  }
}

import { Dispatch, AnyAction } from 'redux';
import { ReducersState } from '../reducers/index';

export default function callAPIMiddleware({
  dispatch,
  getState,
}: {
  dispatch: Dispatch;
  getState: () => ReducersState;
}) {
  return (next: Dispatch) => (action: AnyAction): AnyAction | undefined => {
    const { types, callAPI, shouldCallAPI = (): boolean => true, payload = {}, afterSuccess } = action;
    if (!types) {
      return next(action);
    }

    if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;
    dispatch({ payload, type: requestType });
    return callAPI(getState()).then(
      (response: unknown) => {
        dispatch({
          payload,
          response,
          type: successType,
        });
        if (afterSuccess) {
          afterSuccess(response, dispatch);
        }
      },
      (error: unknown) =>
        dispatch({
          payload,
          error,
          type: failureType,
        }),
    );
  };
}

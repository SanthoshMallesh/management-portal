import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL, ENABLE_AUTHENTICATION } from '../constants/Config';
import { capitalize } from '../utils/helper';
import moment from 'moment';

const NETWORK_WORK = 'Network Error';

interface ErrorResponse {
  status: number;
  data?: {
    error?: {
      details?: Array<{
        path: string;
        message: string;
        code: string;
      }>;
      message?: string;
    };
    errors?: {
      [index: string]: string;
    };
  };
}

/**
 * Handle Errors
 *
 * @param errorResponse
 */
function handleErrors(errorResponse: ErrorResponse): void {
  const { status, data } = errorResponse;

  if (data && status === 422) {
    if (data.error && data.error.details) {
      data.error.details.forEach((detail: { path: string; code: string; message: string }, index: number) => {
        setTimeout(
          () => toast.error(`${capitalize(detail.path.replace('.', ''))} ${detail.code} ${detail.message}`),
          index * 500,
        );
      });
    }

    if (data.error && data.error.message) {
      toast.error(data.error.message);
    }

    if (data.errors) {
      Object.keys(data.errors).forEach((error: string, index: number) => {
        setTimeout(() => data.errors && toast.error(data.errors[error]), index * 500);
      });
    }
  }

  if (status === 400 && data && data.error && data.error.message) {
    try {
      JSON.parse(data.error.message);
    } catch {
      toast.error(data.error.message);
    }
  }
}

const TIMEOUT = 60000;
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

//const authenticationErrorMessage = ['Authorization token is expired'];

apiClient.interceptors.response.use(
  response => {
    console.log('interceptors.response :', JSON.stringify(response));
    return response;
  },
  error => {
    const networkErrorTostId = error.message === NETWORK_WORK ? 'network-error-toast' : '';

    if (!error.config.hideError) {
      if (error.response) {
        handleErrors(error.response);
      } else {
        if (error.message === `timeout of ${TIMEOUT}ms exceeded`) {
          toast.error(NETWORK_WORK, { toastId: networkErrorTostId });
        } else {
          toast.error(error.message, networkErrorTostId ? { toastId: networkErrorTostId } : {});
        }
      }
    }

    return Promise.reject(error);
  },
);

apiClient.interceptors.request.use(async function(config) {
  console.log('interceptors.request : ', JSON.stringify(config));
  return config;
});

export default apiClient;

import actions from '../constants/ActionTypes';
import { AnyAction } from 'redux';
import moment from 'moment';
import api from '../apiClient/index';
import { toast } from 'react-toastify';
import { API_URL, endPoitns } from '../constants/Config';

export function clearReportData(): AnyAction {
  return { type: actions.CLEAR_REPORT_DATA };
}

export function enableModal(): AnyAction {
  return { type: actions.ENABLE_LOADING_MODAL };
}

export function disableModal(): AnyAction {
  return { type: actions.DISABLE_LOADING_MODAL };
}

/*eslint-disable @typescript-eslint/no-emplicit-any*/
/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
export function downloadReport(
  filterProps: {
    mpId: number;
    channel: number;
    reportType: number;
    startDate: string;
    endDate: string;
    timeZone: string;
  },
  cancelToken: any,
  onDownloadProgress: (event: any) => void,
  onFailed: () => void,
): void {
  const date = new Date();
  const preDate = new Date(date.setDate(date.getDate() - 1)).toISOString().slice(0, 10);
  const fileName = 'Report_' + moment(preDate).format('MM_DD_YYYY') + '.xlsx';

  api
    .get(`${API_URL}${endPoitns().performanceReport}/${filterProps.channel}/generate`, {
      params: {
        date: preDate,
      },
      responseType: 'arraybuffer',
      cancelToken,
      onDownloadProgress,
    })
    .then(response => {
      if (response.data.byteLength > 0) downloadFile(response.data, fileName);
    })
    .catch(err => {
      if (err.response.status === 400) {
        toast.error('No Result Found');
      }
      onFailed();
    });
}

const downloadFile = (blobData: Blob, fileName: string): void => {
  const url = window.URL.createObjectURL(
    new Blob([blobData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheet.sheet' }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

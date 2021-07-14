interface AppConfig {
  name: string;
  title: string;
  tagLine: string;
  subTagLine: string;
  url: string;
}

export enum APPS {
  CMP = 'CMP',
  CMP_REPORT = 'CMP-REPORT',
}

export declare enum APP_URLS {
  CMP = '/cmp',
  CMP_REPORT = '/cmp-report',
}

export const cmpReport: AppConfig = {
  name: APPS.CMP_REPORT,
  title: 'Reporting Service',
  tagLine: 'Report',
  subTagLine: 'Portal',
  url: '/cmp-report',
};

export const appList = [cmpReport];

export declare const cmp: AppConfig;

declare const apps: AppConfig[];
export default apps;

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

export declare const cmp: AppConfig;
export declare const cmpReport: AppConfig;
declare const apps: AppConfig[];
export default apps;

export const API_URL = process.env.API_URL;
export const ENABLE_AUTHENTICATION = process.env.DISABLE_AUTHENTICATION !== 'true';
export const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

interface EndPoints {
  channelsUrl: string;
  fieldConfigUrl: string;
  performanceReport: string;
}

export const endPoitns = (version = 'v1'): EndPoints => ({
  channelsUrl: `${version}/channels`,
  fieldConfigUrl: `${version}/fieldConfig`,
  performanceReport: `${version}/reports/offer-performance`,
});

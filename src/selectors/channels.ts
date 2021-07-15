import { Channel } from '../reducers/channels';

interface SelectOption {
  value: number;
  label: string;
}

export const getChannelList = (channels?: Channel[], mpId?: number, reportFilter?: boolean): SelectOption[] => {
  if (!channels || !channels.length) {
    return [];
  }

  return channels
    .filter(channel => (!reportFilter || channel.reports.length > 0) && (!mpId || mpId === channel.marketingProgram.id))
    .map(channel => ({
      value: channel.id,
      label: channel.name,
    }))
    .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));
};

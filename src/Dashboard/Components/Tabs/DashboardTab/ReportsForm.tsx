import React, { ReactElement, useState, useRef } from 'react';
import Form from '@components/Form';
import PrimaryButton from '@components/Buttons/PrimaryButton';
import SecondaryButton from '@components/Buttons/SecondaryButton';
import { useSelector } from 'react-redux';
import { ReducersState } from '../../../../reducers/index';
import { getChannelList } from '@selectors/channels';
import { clearReportData, downloadReport, enableModal, disableModal } from '@actions/reportDetails';
import { useDispatch } from 'react-redux';
import { FormValues, MultiSelectInputProps } from '@components/Form/types';
import { Channel } from '@reducers/channels';
import moment from 'moment';
import styled from 'styled-components';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import axios from 'axios';
import { Formik, FormikProps } from 'formik';

const ModalStyle = styled.div`
  background-color: rgb(255, 255, 255);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  box-shadow: 0px 3px 6px #00000029;
  border-radious: 4px;
  opacity: 1;
  top: 80px;
  width: 727px;
  height: 264px;
  text-align: center;
  padding-top: 30px;
  font: normal normal 600 16px/19px Montserrat;
  letter-spacing: 0px;
  color: #22252a;
  opacity: 1;
  dispaly: inline-block;
  left: 50%;
  transform: translateX(-50%);
`;
const Button = styled.button`
  with: 101px;
  height: 30px;
  border: 1px solid #707070;
  border-radius: 4px;
  opacity: 1;
  margin: 20px 0px 0px 580px;
  font: normal normal 600 12px/15px Montserrat;
  letter-spacing: 0px;
  color: #22252a;
  background-color: rgb(255, 255, 255);
  outline: none !important;
`;

export default function ReportsForm(): ReactElement {
  const cancelTokenSource = useRef();
  cancelTokenSource.current = axios.CancelToken.source();
  const [percentage, setProgress] = useState(0);
  const channels = useSelector((state: ReducersState) => state.channels.data);
  const isLoadingChannels = useSelector((state: ReducersState) => state.channels.isFetching);
  const enableLoadingModal = useSelector((state: ReducersState) => state.reportDetails.enableLoadingModal);
  const isLoading = useSelector(
    (state: ReducersState) => !!state.reportDetails.results.find(result => result.isFetching),
  );

  const filterTypes = [
    { valus: 1, label: 'Report Offer Performance', id: 'offer-performance' },
    { valus: 1, label: 'Report Receipt Redemption', id: 'receipt-redemption' },
  ];

  const mpIds: Array<{ name: string; id: number }> = [];
  const pgMpids: { [id: number]: number } = [];
  const timeZone: { [id: number]: string } = [];

  channels.forEach((channel: Channel) => {
    const { id, name, pgMpId } = channel.marketingProgram;
    const isDuplicate = mpIds.find(mpid => mpid.id === id);
    if (!isDuplicate && channel.reports.length > 0) {
      pgMpids[id] = pgMpId;
      timeZone[id] = channel.timeZone.timeZone || '';
      mpIds.push({ name, id });
    }
  });
  mpIds.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  const dispatch = useDispatch();

  return (
    <Form
      name="reportingForm"
      onSubmit={(values: {
        mpId: number;
        channel: number;
        reporttype: number;
        startdate: string;
        enddate: string;
      }): void => {
        const selectedValues = {
          mpId: pgMpids[values.mpId],
          channel: values.channel,
          reportType: values.reporttype,
          startDate: values.startdate,
          endDate: values.enddate,
          timeZone: timeZone[values.mpId],
        };
        dispatch(enableModal());
        downloadReport(
          selectedValues,
          cancelTokenSource.current.token,
          event => {
            setProgress(Math.round((100 * event.loaded) / event.total));
          },
          () => {
            dispatch(disableModal());
          },
        );
      }}
      flowStatus={true}
      defaultValues={{ mpId: mpIds.length === 1 ? mpIds[0].id : '' }}
      fields={[
        [
          {
            name: 'mpId',
            label: 'Marketing Program',
            placeholder: 'Select',
            type: 'select',
            notes: 'Marketing Program',
            //eslint-disable-nect-line
            props: (_, formProps: any): MultiSelectInputProps => ({
              options: mpIds.map((mpId: { name: string; id: number }) => ({
                value: mpId.id,
                label: mpId.name,
              })),
              onChange: (): void => {
                formProps.setFieldValue('channel', '', false);
                setProgress(0);
                dispatch(disableModal());
              },
            }),
            validation: { required: true },
          },
          {
            name: 'channel',
            label: 'Cahnnels',
            placeholder: 'Select',
            type: 'select',
            notes: 'Cahnnels',
            props: (values: FormValues, formProps: FormikProps<FormValues>): MultiSelectInputProps => ({
              options: getChannelList(channels, values.mpId, true),
              disabled: !values.mpId,
              onChange: (): void => {
                setProgress(0);
                formProps.setFieldValue('reportType', '');
                formProps.setFieldTouched('reportType', false);
                formProps.setFieldValue('startDate', '');
                formProps.setFieldTouched('startDate', false);
                formProps.setFieldValue('endDate', '');
                formProps.setFieldTouched('endDate', false);
                dispatch(disableModal());
              },
            }),
            validation: { required: true },
          },
          {
            name: 'reportType',
            label: 'Type of Report',
            placeholder: 'Select',
            type: 'select',
            notes: 'Report Type',
            //eslint-disable-nect-line
            props: (values: FormValues, formProps: any): MultiSelectInputProps => {
              const channel = values.channel && channels.find(channelDetails => channelDetails.id === values.channel);
              return {
                options: getChannelList(channels, values.mpId),
                disabled: !channels,
                onChange: (): void => {
                  formProps.setFieldValue('startDate', '');
                  formProps.setFieldTouched('startDate', false);
                  formProps.setFieldValue('endDate', '');
                  formProps.setFieldTouched('endDate', false);
                  setProgress(0);
                  dispatch(disableModal());
                },
              };
            },
            validation: { required: true },
          },
          {
            name: 'startDate',
            label: 'Start Date',
            placeholder: 'From Date...',
            type: 'date',
            notes: 'Start Date',
            validation: { required: true },
            //eslint-disable-nect-line
            props: (values: FormValues): any => ({
              onChange: (): void => {
                setProgress(0);
                dispatch(disableModal());
              },
              maxDate: values.endDate ? values.endDate : moment(),
              canRender: values.reportType === 2,
            }),
          },
          {
            name: 'endDate',
            label: 'End Date',
            placeholder: 'From Date...',
            type: 'date',
            notes: 'End Date',
            validation: { required: true },
            //eslint-disable-nect-line
            props: (values: FormValues): any => ({
              minDate: values.startDate ? values.startDate : '',
              maxDate: moment(),
              canRender: values.reportType === 2,
              onChange: (): void => {
                setProgress(0);
                dispatch(disableModal());
              },
            }),
          },
        ],
        [],
      ]}
    >
      {(fields, reset, values): ReactElement => (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">{fields}</div>
          </div>
          <div className="row" style={{ position: 'absolute', right: 30 }}>
            <SecondaryButton
              type="button"
              className="mr-2"
              onClick={(): void => {
                reset();
                dispatch(clearReportData());
                setProgress(0);
              }}
            >
              Reset
            </SecondaryButton>
            <PrimaryButton
              type="submit"
              className="ml-2"
              disabled={
                isLoadingChannels ||
                isLoading ||
                !values.mpId ||
                !values.reportType ||
                !values.channel ||
                ((values.reporttype === 2 && !values.startDate) || (values.reportType === 2 && !values.endDate))
              }
            >
              {' '}
              Generate Report
            </PrimaryButton>
          </div>
          {true && (
            <ModalStyle>
              <div>
                <div style={{ height: 115, width: 115, marginLeft: 300 }}>
                  <CircularProgressbarWithChildren
                    value={percentage}
                    strokeWidth={5}
                    background
                    styles={buildStyles({
                      strokeLinecap: 'round',
                      textSize: '16px',
                      pathTransitionDuration: 0.5,
                      pathColor: 'rgb(0, 61, 166)',
                      backgroundColor: '#E9EDF6',
                      textColor: '#22252A',
                    })}
                  >
                    <strong
                      style={{
                        paddingTop: 15,
                        font: 'normal normal medium 20px/24px Montserrat',
                        letterSpacing: 0,
                        color: '#22252A',
                        opacity: 1,
                        fontWeight: 600,
                        paddingLeft: 10,
                      }}
                    >{`${percentage}%`}</strong>
                    <p
                      style={{
                        font: 'normal normal medium 20px/24px Montserrat',
                        letterSpacing: 0,
                        color: '#22252A',
                        opacity: 1,
                        fontWeight: 400,
                        paddingLeft: 5,
                      }}
                    >
                      Complete
                    </p>
                  </CircularProgressbarWithChildren>
                </div>
                <Button
                  type="button"
                  onClick={(): void => {
                    setProgress(0);
                    cancelTokenSource.current.cancel();
                    dispatch(clearReportData());
                  }}
                >
                  {percentage === 100 ? 'Close' : 'Cancel'}
                </Button>
              </div>
            </ModalStyle>
          )}
        </div>
      )}
    </Form>
  );
}

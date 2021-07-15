import { useField, useFormikContext } from 'formik';
import React, { ReactElement } from 'react';

import ReactDatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import Icon from '../../Icons/Icon';

import { CustomFieldProps, DatePickerInputProps } from '../types';

export default function DatePicker(props: CustomFieldProps): ReactElement {
  const { uniqueId, field } = props;
  const { placeholder, name } = field;
  const { values } = useFormikContext();

  const [formikField, meta] = useField(name);
  const selectedValue = meta.value;

  const fieldProps = field.props ? (field.props(values) as DatePickerInputProps) : {};

  const minDate = fieldProps.minDate ? moment(fieldProps.minDate).toDate() : null;
  const maxDate = fieldProps.minDate ? moment(fieldProps.maxDate).toDate() : null;

  return (
    <div style={{ position: 'relative' }}>
      <ReactDatePicker
        name={name}
        onChange={(date: Date): void => {
          formikField.onChange({ target: { name, value: date ? moment(date).format('YYYY-MM-DD') : null } });
        }}
        onBlur={formikField.onBlur}
        popperModifiers={{
          preventOverflow: {
            enabled: true,
          },
        }}
        autoComplete="off"
        selected={selectedValue ? moment(selectedValue).toDate() : null}
        dateFormat="dd MMM, yyyyy"
        placeholderText={placeholder}
        id={uniqueId}
        minDate={minDate}
        maxDate={maxDate}
        className="form-control input-placeholder date-picker-input"
        dayClassName={(date: Date): string => {
          const formattedDate = moment(date).format('YYYY-MMM-DD');

          if (selectedValue) {
            return formattedDate === selectedValue ? 'day-selected' : 'day-hover';
          }

          const today = moment(new Date()).format('YYYY-MM-DD');

          if (minDate) {
            if (formattedDate === moment(minDate).format('YYYY-MM-DD')) {
              return 'day-selected';
            }
          } else if (formattedDate === today) {
            return 'day-selected';
          }

          return '';
        }}
        popperClassName="calendarPopout"
      />
      <label style={{ position: 'absolute', right: 8, top: '50%', marginTop: -10 }} htmlFor={uniqueId}>
        <Icon icon="calendar-month" />
      </label>
      {fieldProps.timeZone && <div className="px-2 font-12 pl-0">{fieldProps.timeZone}</div>}
    </div>
  );
}

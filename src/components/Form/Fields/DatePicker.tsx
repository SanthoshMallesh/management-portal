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

  return <div style={{ position: 'relative' }}>{/* <ReactDatePicker></ReactDatePicker> */}</div>;
}

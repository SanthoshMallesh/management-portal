import { ReactElement } from 'react';
import {Moment} from 'moment-timezone';
export interface CustomFieldProps {
  field: FieldProps;
  uniqueId: string;
}

interface FieldInputProps {
  canRender?: boolean;
}

export interface FormProps {
  name: string;
  //eslint-disable-next-line
  fields: any;
  children: (
    fields: ReactElement;
    reserForm: () => void;
    values: { startDate: string; endDate: string; mpId: number; channel: string },
  ) => ReactElement;
  flowStatus: boolean;
}

//eslint-diable-next-line
export type FormValues = any;

export interface ValidationProps {
  required?: boolean;
  minCharacters?: number;
  alphaNumeric?: boolean;
  minNumber?: number;
  maxNumber?: number;
  maxLength: number;
}

export interface NumberInputProps extends FieldInputProps {
  allowNegative?: boolean;
  allowLeadingZeros?: boolean;
  decimalSeparator?: boolean;
}

export type MultiSelectFieldValue = string | number;

export interface MultiSelectFieldOption {
  value: MultiSelectFieldValue;
  label?: string;
}

export type CheckboxFieldValue = string | number;

export interface CheckboxFieldOption {
  value: CheckboxFieldValue;
  label?: string;
}

export interface MultiSelectInputProps extends FieldInputProps {
  isOptionDisabled?: (option: MultiSelectFieldValue) => boolean;
  options?: MultiSelectFieldOption[];
  onChange?: () => void;
  disabled?: boolean;
}

export interface TextAreaInputProps extends FieldInputProps {
  row?: number;
  count?: boolean;
}

export interface CheckboxInputProps extends FieldInputProps {
  option?: CheckboxFieldOption[];
}

export interface FieldProps {
  type: 'text' | 'number' | 'multiSelect' | 'date' | 'textarea' | 'checkbox' | 'imageUpload';
  name: string;
  label?: string;
  gridSize?: number;
  placeholder?: string;
  notes?: string;
  errorPrefix?: string;
  validation?: ValidationProps;
  astrick?: boolean;
  props?: (
    values: FormValues,
    //eslint-diable-next-line
    fromProps?: any,
  ) => FieldInputProps & (NumberInputProps | MultiSelectInputProps | TextAreaInputProps | CheckboxInputProps);
}

export interface DatePickerInputProps extends FieldInputProps {
  minDate?: string | Moment;
  maxDate?: string | Moment;
  timeZone?: string | null;
  onChange?: () => void;
}

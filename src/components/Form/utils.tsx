import { Field } from 'formik';
import React, { ReactElement } from 'react';

import validate from './validation';
import { FieldProps, FormValues } from './types';

import Layout from './Fields/Layout';

import MultiSelect from './Fields/MultiSelect';
import DatePicker from './Fields/DatePicker';
import Select from './Fields/Select';

//eslint-disable-next-line
export const flattenFields = (a: any): any => (Array.isArray(a) ? [].concat(...a.map(flattenFields)) : a);

/**
 *
 * Render Row
 *
 * @param fields
 * @param formName
 * @param index
 * @param values
 * @returns
 */
const renderRow = (fields: FieldProps[], formName: string, index: number, values: FormValues): ReactElement => {
  return (
    <div className="row" key={index}>
      {fields.map(field => (
        <div
          key={`${formName}-field-${field.name}-col`}
          className={`col${field.gridSize ? `-${field.gridSize}` : ''} ${field.offset ? `offest-${field.offset}` : ''}`}
        >
          {//eslint-disable-next-line
          renderField(field, formName, index, values)}
        </div>
      ))}
    </div>
  );
};

/**
 *
 * Render Field
 *
 * @param field
 * @param formName
 * @param index
 * @param values
 * @returns
 */

export const renderField = (
  field: FieldProps | FieldProps[],
  formName: string,
  index: number,
  values: FormValues,
): ReactElement => {
  if (Array.isArray(field)) {
    return renderRow(field, formName, index, values);
  }

  const { type, name } = field;
  const uniqueId = `${formName}-field-${name}`;

  let inputElement: ReactElement;
  switch (type) {
    case 'multiSelect':
      inputElement = <MultiSelect field={field} uniqueId={uniqueId} />;
      break;
    case 'date':
      inputElement = <DatePicker field={field} uniqueId={uniqueId} />;
      break;
    case 'select':
      inputElement = <Select field={field} uniqueId={uniqueId} />;
      break;
  }

  return (
    <Field key={uniqueId} validate={(value: string): Promise<string> => validate(field, value, values)}>
      {(): ReactElement => (
        <Layout field={field} uniqueId={uniqueId}>
          {inputElement}
        </Layout>
      )}
    </Field>
  );
};

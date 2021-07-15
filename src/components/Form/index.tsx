import React, { ReactElement } from 'react';
import { Formik } from 'formik';
import { FieldProps, FormProps } from './types';

import Styles from './styles';
import { renderField, flattenFields } from './utils';

export default function Form(props: FormProps): ReactElement {
  const { fields, name: formName, children, onSubmit, defaultValues } = props;

  //eslint-disable-next-line
  const initialValues: any = defaultValues || {};

  flattenFields(fields).forEach((field: FieldProps) => {
    if (!initialValues[field.name]) {
      initialValues[field.name] = '';
    }
  });

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values, actions): void => {
        actions.setSubmitting(false);
        onSubmit(values);
      }}
    >
      {({ handleSubmit, values, resetForm }): ReactElement => {
        const fieldsElement = fields.map((field: FieldProps | FieldProps[], index: number) => {
          return renderField(Array.isArray(field) ? field : [field], formName, index, values);
        });
        return <Styles.Form onSubmit={handleSubmit}>{children(fieldsElement, resetForm, values)}</Styles.Form>;
      }}
    </Formik>
  );
}

import Tooltip from '@components/ToolTip';
import { useField, useFormikContext } from 'formik';
import React, { PropsWithChildren, ReactElement } from 'react';

import Styles from '../styles';
import { CustomFieldProps } from '../types';

export default function Layout(props: PropsWithChildren<CustomFieldProps>): ReactElement | null {
  const { children, uniqueId, field } = props;
  const { name, label, notes, validation, astrick } = field;
  const [, meta] = useField(name);
  const { values } = useFormikContext();

  const fieldProps = field.props && field.props(values);

  if (fieldProps && fieldProps.canRender === false) {
    return null;
  }

  const requiredValidation = validation && validation.required;

  return (
    <div className="form-group">
      {label && (
        <Styles.Label htmlFor={uniqueId}>
          {notes ? (
            <Tooltip content={notes}>{(tooltipProps): ReactElement => <span {...tooltipProps}>{label}</span>}</Tooltip>
          ) : (
            label
          )}
          {requiredValidation && <Styles.RequiredAstrick className="ml-1">*</Styles.RequiredAstrick>}
          {!requiredValidation && astrick && <span className="ml-1">*</span>}
        </Styles.Label>
      )}
      {children}
      {meta.touched && meta.error && <Styles.info>{meta.error}</Styles.info>}
    </div>
  );
}

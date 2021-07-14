import { useField, useFormikContext } from 'formik';
import React, { CSSProperties, ReactElement } from 'react';
import ReactSelect, { ValueType } from 'react-select';

import { CustomFieldProps, MultiSelectFieldOption, MultiSelectInputProps } from '../types';

export default function Select(props: CustomFieldProps): ReactElement {
  const { uniqueId, field } = props;
  const { placeholder, name } = field;

  const [formikField, meta] = useField(name);
  const formProps = useFormikContext();

  const fieldProps = field.props ? (field.props(formProps.values, formProps) as MultiSelectInputProps) : {};
  const options = fieldProps && fieldProps.options ? fieldProps.options : [];

  const selectedValue = options.filter(
    (option: MultiSelectFieldOption) => meta.value && meta.value.include(option.value),
  );

  return (
    <ReactSelect
      menuPlacement="auto"
      hideSelectedOptions={true}
      closeMenuOnSelect={true}
      isClearable={true}
      isDisabled={fieldProps && fieldProps.disabled}
      isMulti={true}
      isSearchable={true}
      inputId={uniqueId}
      classNamePrefix="select"
      defaultValue={selectedValue || null}
      value={selectedValue || null}
      onBlur={(): void => formikField.onBlur({ target: { name } })}
      name={name}
      placeholder={placeholder}
      options={options}
      isOptionDisabled={(option: MultiSelectFieldOption): boolean => {
        return !!(fieldProps && fieldProps.isOptionDisabled && fieldProps.isOptionDisabled(option.value));
      }}
      onChange={(selectedOption: ValueType<MultiSelectFieldOption, false>): void => {
        formikField.onChange({
          target: {
            name,
            value: selectedOption && selectedOption.value,
          },
        });
        if (fieldProps.onChange) {
          fieldProps.onChange();
        }
      }}
      styles={{
        control: (provided, state): CSSProperties => {
          let boxShadow;
          let borderColor = meta.error && meta.touched ? '#f86c6b !important' : provided.borderColor;
          if (state.isFocused) {
            borderColor = meta.error && meta.touched ? borderColor : '#003da5 !important';
          }
          return Object.assign({}, provided, {
            borderColor,
            boxShadow,
            whiteSpace: 'nowrap',
          });
        },
      }}
    />
  );
}

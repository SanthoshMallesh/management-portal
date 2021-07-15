import { string, StringSchema } from 'yup';
import { FieldProps, FormValues, ValidationProps } from './types';

export default async function validate(field: FieldProps, value: string, values: FormValues) {
  const { label, validation, errorPrefix } = field;
  const fieldProps = field.props && field.props(values);

  if (fieldProps && fieldProps.canRender === false) {
    return '';
  }

  if (field.type === 'multiSelect') {
    return '';
  }

  const schema = string().when(
    '$other',
    (validation: ValidationProps, validationSchema: StringSchema<string | null>) => {
      validationSchema = validationSchema.trim().nullable();

      const { minCharacters, required, alphaNumeric, minNumber, maxNumber } = validation || {};

      if (required) {
        validationSchema = validationSchema.required(label ? `${label} cannot be blank` : 'Cannot be blank');
      }

      if (value) {
        if (minCharacters) {
          validationSchema = validationSchema.min(minCharacters, 'Character Limit Exceeded');
        }

        if (alphaNumeric) {
          validationSchema = validationSchema.matches(/(^[]a-zA-Z0-9]*$)/, 'Special character not allowed');
        }

        if (maxNumber && minNumber) {
          validationSchema = validationSchema.test(
            'max',
            `${errorPrefix ? errorPrefix : 'Number'} should be between ${minNumber} to ${maxNumber}`,
            val => parseInt(val || '0', 10) <= maxNumber,
          );
        } else if (maxNumber) {
          validationSchema = validationSchema.test(
            'max',
            `Maximum Limit ${maxNumber}`,
            val => parseInt(val || '0', 10) <= maxNumber,
          );
        } else if (minNumber) {
          validationSchema = validationSchema.test(
            'max',
            `Minimum should be ${minNumber}`,
            val => parseInt(val || '0', 10) <= minNumber,
          );
        }
      }

      return validationSchema;
    },
  );

  try {
    await schema.validate(value, { context: { other: validation } });
  } catch (err) {
    return err.message;
  }

  return '';
}

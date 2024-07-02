import { ErrorMessage, useField } from 'formik';
import { InputHTMLAttributes } from 'react';

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export const CheckBox = ({ label, name, ...props }: CheckBoxProps) => {
  const [ field ] = useField(name);
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <input type="checkbox" id={name} {...field} {...props} />
        <label htmlFor={name}>{label}</label>
      </div>
      <ErrorMessage name={name} component="span" />
    </div>
  );
};
import { InputHTMLAttributes } from 'react';
import { ErrorMessage, useField } from 'formik';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  yesAndNoLabels?: boolean;
}

export const Switch = ({
  name,
  yesAndNoLabels = false,
  ...props
}: SwitchProps) => {
  const [field, , helpers] = useField(name);

  const handleChange = () => {
    helpers.setValue(!field.value);
  };

  return (
    <div className="flex flex-col">
      <div className="inline-flex items-center gap-2 lg:justify-end">
        {yesAndNoLabels && (
          <p className="text-sm">
            {yesAndNoLabels ? 'NO' : field.value ? 'NO' : 'SI'}
          </p>
        )}

        <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
          <input
            type="checkbox"
            className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-red-300 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
            id={name}
            checked={field.value}
            onChange={handleChange}
            {...props}
          />
          <label
            htmlFor={name}
            className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
          >
            <div
              className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
              data-ripple-dark="true"
            ></div>
          </label>
        </div>
        {yesAndNoLabels && (
          <p className="text-sm">
            {yesAndNoLabels ? 'SI' : field.value ? 'SI' : 'NO'}
          </p>
        )}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs mt-1 lg:text-right"
      />
    </div>
  );
};

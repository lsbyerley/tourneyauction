import * as React from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';

import { ChevronDownSmallIcon } from '@/components/icons';

function Form({ children, methods, onSubmit, ...props }) {
  console.log('LOG Form.js', onSubmit, { ...props });
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}

const Input = React.forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      field,
      placeholder,
      type = 'text',
    },
    ref
  ) => {
    return (
      <fieldset className={className}>
        <input
          id={field}
          name={field}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className='w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400'
          ref={ref}
        />
        {children}
      </fieldset>
    );
  }
);

const Select = React.forwardRef(
  (
    {
      children,
      className,
      defaultValue = '',
      disabled,
      field,
      label,
      options,
      ...props
    },
    ref
  ) => {
    return (
      <fieldset className={className}>
        {label ? (
          <label htmlFor={field} className='sr-only'>
            {label}
          </label>
        ) : null}
        <div className='relative'>
          <select
            id={field}
            name={field}
            disabled={disabled}
            defaultValue={defaultValue}
            className='block w-full py-2 pl-3 pr-10 text-base text-gray-900 bg-white border border-gray-300 rounded-md appearance-none bg-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            ref={ref}
            {...props}
          >
            <option disabled value=''>
              Please select an option
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
            <ChevronDownSmallIcon
              className='w-4 h-4 text-gray-400'
              aria-hidden='true'
            />
          </div>
        </div>
        {children}
      </fieldset>
    );
  }
);

const Textarea = React.forwardRef(
  (
    {
      children,
      className,
      disabled = false,
      field,
      placeholder,
      rows = 4,
      type = 'text',
    },
    ref
  ) => {
    return (
      <fieldset className={className}>
        <textarea
          id={field}
          name={field}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          className='w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400'
          ref={ref}
        />
        {children}
      </fieldset>
    );
  }
);

function FormInput(props) {
  const { errors, register } = useFormContext();

  return (
    <React.Fragment>
      <Input ref={register} {...props}>
        {errors?.[props.field] ? (
          <p className='mt-2 text-sm text-red-700'>
            {errors[props.field].message}
          </p>
        ) : null}
      </Input>
    </React.Fragment>
  );
}

function FormSelect(props) {
  const { errors, register } = useFormContext();

  return (
    <Select ref={register} {...props}>
      {errors?.[props.field] ? (
        <p className='mt-2 text-sm text-red-700'>
          {errors[props.field].message}
        </p>
      ) : null}
    </Select>
  );
}

function FormTextarea(props) {
  const { errors, register } = useFormContext();

  return (
    <React.Fragment>
      <Textarea ref={register} {...props}>
        {errors?.[props.field] ? (
          <p className='mt-2 text-sm text-red-700'>
            {errors[props.field].message}
          </p>
        ) : null}
      </Textarea>
    </React.Fragment>
  );
}

Form.Input = FormInput;
Form.Select = FormSelect;
Form.Textarea = FormTextarea;

export default Form;

export { Input, Select, Textarea };

import { ChangeEvent } from 'react';

interface IProps {
  name?: string;
  id?: string;
  placeholder?: string;
  type?: string;
  value?: string | number;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
  name,
  id,
  placeholder,
  type = 'text',
  value = '',
  maxLength,
  onChange,
}: IProps) => {
  return (
    <div className="mt-1 flex rounded-md shadow-sm">
      <input
        className="focus:ring-indigo-500 py-1 focus:border-indigo-500 flex-1 block rounded-none rounded-r-md sm:text-sm border-gray-300 placeholder-gray-800"
        placeholder={placeholder}
        {...{ id, type, name, placeholder, onChange, value, maxLength }}
      />
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FC } from "react";

interface SelectProps {
  options: Array<{ value: string; text: string }>;
  onChange: (value?: any) => void;
  value: string;
}

const Select: FC<SelectProps> = ({ value, onChange, options = [] }) => {
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <select onChange={handleOnChange} value={value}>
      {options.map(({ value, text }, index) => {
        return (
          <option key={index} value={value}>
            {text}
          </option>
        );
      })}
    </select>
  );
};

export default Select;

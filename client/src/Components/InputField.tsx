import { useState, useEffect } from "react";

interface InputFieldProps {
  label: string;
  littleText?: string;
  labelFor: string;
  placeholder?: string;
  value: any;
  type?: string;
  className?: string;
  onChange?: (value: any) => void;
}

export default function InputField({
  label,
  littleText,
  placeholder,
  labelFor,
  value,
  type,
  className,
  onChange,
}: InputFieldProps) {
  const [inputValue, setValue] = useState(value);

  function valueChange(event: any) {
    let value = event.target.value;
    if (onChange) {
      onChange(value);
    }
    setValue(value);
  }

  return (
    <>
      <label htmlFor={labelFor}>{label}</label>
      <input
        value={inputValue}
        onInput={(event) => valueChange(event)}
        id={labelFor}
        type={type || "string"}
        placeholder={placeholder}
        className={className}
      />
    </>
  );
}

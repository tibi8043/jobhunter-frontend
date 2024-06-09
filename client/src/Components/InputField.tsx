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
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={labelFor}>{label}</label>
        <input
          value={value}
          onChange={onChange}
          id={labelFor}
          type={type || "string"}
          placeholder={placeholder}
          className={className}
        />
      </div>
    </>
  );
}

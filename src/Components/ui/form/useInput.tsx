import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function TextInput({ field, touched, error }) {
  const { id, name, title, type, onChange, onBlur, value } = field;

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {title}
        </label>
        <input
          type={type}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          name={name}
          placeholder={`Please Enter ${title}`}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        {touched && error ? (
          <div className="text-red-500 text-xs italic">{error}</div>
        ) : null}
      </div>
    </>
  );
}

function TextArea({ field, touched, error }) {
  const { id, name, title, onChange, onBlur, value } = field;

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {title}
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          name={name}
          placeholder={`Please enter ${title}`}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        ></textarea>
        {touched && error ? (
          <div className="text-red-500 text-xs italic">{error}</div>
        ) : null}
      </div>
    </>
  );
}

const RadioButtonGroup = ({ field, touched, error }) => {
  const { id, name, title, options, onChange, onBlur, value } = field;

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {title}
      </label>
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center mr-4">
          <input
            type="radio"
            id={id}
            name={name}
            value={option.value}
            onChange={onChange}
            onBlur={onBlur}
            checked={value === option.value}
            className="form-radio"
          />
          <span className="ml-2">{option.label}</span>
        </label>
      ))}
      {touched && error ? (
        <div className="text-red-500 text-xs italic">{error}</div>
      ) : null}
    </div>
  );
};

const ImageInput = ({ field, touched, error }) => {
  const { id, name, title, onChange, onBlur } = field;

  const handleChange = (event) => {
    onChange(event); // call formik's onChange
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      field.setFieldValue(name, file);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {title}
      </label>
      <input
        type="file"
        id={id}
        name={name}
        onChange={handleChange}
        onBlur={onBlur}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        accept="image/*"
      />
      {touched && error ? (
        <div className="text-red-500 text-xs italic">{error}</div>
      ) : null}
    </div>
  );
};

export { TextInput, TextArea, RadioButtonGroup, ImageInput };

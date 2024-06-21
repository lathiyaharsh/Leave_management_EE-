//not in use
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function getInitialValues(fields) {
  const initialValues = {};
  const { name } = fields.field;
  initialValues[name] = "";
  return initialValues;
}

function getValidationSchema(fields) {
  const { name, title } = fields.field;
  const schema = {};
  schema[name] = Yup.string()
   .email("Invalid email address")
   .required(`${title} is required`);
  return Yup.object().shape(schema);
}

function EmailInput({fields}) {
  const initialValues = getInitialValues(fields);
  const validationSchema = getValidationSchema(fields);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      
    },
  });

  const { touched, errors, handleChange, handleBlur, values } = formik;

  const { id, name, title } = fields.field;

  
  return (
    <>
    <div>
    <label
      htmlFor={id}
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      {title}
    </label>
    <input
    type="email"
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id={id}
    name={name}
    placeholder={`Please enter ${title}`}
    value={values[name]}
    onChange={handleChange}
    onBlur={handleBlur}
  />
    {touched[name] && errors[name] ? (
      <div className="text-red-500 text-xs italic">{errors[name]}</div>
    ) : null}
  </div>
    </>
  );
}

export { EmailInput };
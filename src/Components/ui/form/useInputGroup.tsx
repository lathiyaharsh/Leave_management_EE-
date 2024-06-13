import React from "react";
import { TextArea, TextInput, RadioButtonGroup, ImageInput } from "./useInput";

const FieldGroup = ({ fields, formik }) => {
  return (
    <>
      {fields.map((field) => {
        switch (field.type) {
          case "textarea":
            return (
              <TextArea
                key={field.id}
                field={{
                  ...field,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  value: formik.values[field.name],
                }}
                touched={formik.touched[field.name]}
                error={formik.errors[field.name]}
              />
            );
          case "radio":
            return (
              <RadioButtonGroup
                key={field.id}
                field={{
                  ...field,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  value: formik.values[field.name],
                }}
                touched={formik.touched[field.name]}
                error={formik.errors[field.name]}
              />
            );
            case "file":
                return (
                  <ImageInput
                    key={field.id}
                    field={{
                      ...field,
                      onChange: formik.handleChange,
                      onBlur: formik.handleBlur,
                      setFieldValue: formik.setFieldValue,
                    }}
                    touched={formik.touched[field.name]}
                    error={formik.errors[field.name]}
                  />
                );
          default:
            return (
              <TextInput
                key={field.id}
                field={{
                  ...field,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  value: formik.values[field.name],
                }}
                touched={formik.touched[field.name]}
                error={formik.errors[field.name]}
              />
            );
        }
      })}
    </>
  );
};

export default FieldGroup;

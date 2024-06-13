import { AnyARecord } from "dns";
import * as Yup from "yup";
const idValidation = Yup.number()
  .integer("Invalid id")
  .required("id is required");
const nameValidation = Yup.string()
  .min(3, "Must be 3 characters or more")
  .max(20, "Must be 20 characters or less")
  .required("Name is required");
const addressValidation = Yup.string()
  .min(3, "Must be 3 characters or more")
  .max(200, "Must be 200 characters or less")
  .required("Description is required");
const emailValidation = Yup.string()
  .email("Invalid email address")
  .required("Email is required");
const passwordValidation = Yup.string()
  .min(3, "Must be 3 characters or more")
  .max(12, "Must be 12 characters or less")
  .required("Password is required");
const phoneValidation = Yup.number().required("Phone number is required");
const genderValidation = Yup.string().required("Gender is required");
const imageValidation = Yup.mixed().required("Image is required");
const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("Confirm password is required");
const divValidation = Yup.string().required(" div is required");
const roleValidation = Yup.string().required(" role is required ");
const departmentValidation = Yup.string().required(" department is required ");

function useModelValidation(type) {
  let modelValidation: any = "";
  if (type === "add_student") {
    modelValidation = Yup.object({
      name: nameValidation,
      email: emailValidation,
      gender: genderValidation,
      image: imageValidation,
      password: passwordValidation,
      confirmPassword: confirmPasswordValidation,
      phone: phoneValidation,
      address:addressValidation,
    });
  }
  if (type === "update_profile") {
    modelValidation = Yup.object({
      name: nameValidation,
      email: emailValidation,
      gender: genderValidation,
      image: imageValidation,
      phone: phoneValidation,
      address:addressValidation,
    });
  }

  return modelValidation;
}

export default useModelValidation;

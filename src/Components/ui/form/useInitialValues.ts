function useInitialValues(type: string) {
  let initialValues: any = {};
  if (type === "add_student") {
    initialValues = {
      name: "",
      email: "",
      gender: "",
      image: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    };
  }
  if (type === "update_profile") {
    initialValues = {
      name: "",
      email: "",
      gender: "",
      image: "",
      phone: "",
      address: "",
    };
  }

  return initialValues;
}

export default useInitialValues;

import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password should be minimum 6 characters")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters"),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Password must match"
    ),
    email: string()
      .required('Email is required')
      .email('Must be a valid email')
  })
});

export const createUserSessionSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(6, "Password should be minimum 6 characters")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters"),
    email: string()
      .required('Email is required')
      .email('Must be a valid email')
  })
});

import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@redberry\.ge$/,
      "Email must end with @redberry.ge"
    ),
  selectField: yup.string().required("Please select an option"),
});

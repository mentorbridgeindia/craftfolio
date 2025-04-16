import * as yup from "yup";
export const contactSchema = yup.object().shape({
  contact: yup.object().shape({
    id: yup.string().required(),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    phone: yup.string().optional(),
    address: yup.string().optional(),
    socialLinks: yup.array().of(
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required("Social link name is required"),
        link: yup
          .string()
          .url("Must be a valid URL")
          .required("Link is required"),
      })
    ),
  }),
});

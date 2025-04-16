import * as yup from "yup";

export const educationSchema = yup.object().shape({
  education: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      institutionName: yup.string().required("Institution name is required"),
      specialization: yup.string().required("Specialization is required"),
      from: yup.string().required("Start date is required"),
      till: yup.string().required("End date is required"),
    })
  )
});

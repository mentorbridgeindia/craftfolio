import * as yup from "yup";

export const internshipSchema = yup.object().shape({
  internships: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      companyName: yup.string().required("Company name is required"),
      designation: yup.string().required("Designation is required").optional(),
      from: yup.string().required("Start date is required"),
      till: yup.string().required("End date is required"),
      website: yup.string().url("Must be a valid URL").optional(),
      image: yup.mixed<File>().optional(),
    })
  ),
});

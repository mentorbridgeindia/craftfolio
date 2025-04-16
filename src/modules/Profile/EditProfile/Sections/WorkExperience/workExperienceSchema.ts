import * as yup from "yup";

export const workExperienceSchema = yup.object().shape({
  workExperience: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      companyName: yup.string().required("Company name is required"),
      designation: yup.string().required("Designation is required"),
      from: yup.string().required("Start date is required"),
      till: yup.string().optional(),
      isCurrentlyWorking: yup.boolean().required(),
      location: yup.string().required("Location is required"),
    })
  ),
});

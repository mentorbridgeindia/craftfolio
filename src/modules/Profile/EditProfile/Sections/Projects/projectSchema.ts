import * as yup from "yup";

export const projectSchema = yup.object().shape({
  projects: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      name: yup.string().required("Project name is required"),
      link: yup
        .string()
        .url("Must be a valid URL")
        .required("Link is required"),
      description: yup.string().required("Description is required"),
      coverImage: yup.mixed<File>().optional(),
    })
  ),
});

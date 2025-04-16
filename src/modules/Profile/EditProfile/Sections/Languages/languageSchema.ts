import * as yup from "yup";

export const languageSchema = yup.object().shape({
  languages: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      name: yup.string().required("Language name is required"),
      proficiency: yup.string().required("Proficiency is required"),
    })
  ),
});

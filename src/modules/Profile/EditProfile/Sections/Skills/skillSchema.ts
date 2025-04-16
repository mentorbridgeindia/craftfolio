import * as yup from "yup";

export const skillSchema = yup.object().shape({
  skills: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      name: yup.string().required("Skill name is required"),
      rating: yup
        .number()
        .required("Rating is required")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),
    })
  ),
});

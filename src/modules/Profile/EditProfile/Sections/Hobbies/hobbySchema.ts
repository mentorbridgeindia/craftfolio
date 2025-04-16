import * as yup from "yup";

export const hobbySchema = yup.object().shape({
  hobbies: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      name: yup.string().required("Hobby name is required"),
    })
  ),
});

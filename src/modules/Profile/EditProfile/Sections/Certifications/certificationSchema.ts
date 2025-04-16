import * as yup from "yup";

export const certificationSchema = yup.object().shape({
  certifications: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      name: yup.string().required("Certification name is required"),
      issuedBy: yup.string().required("Issued by is required"),
      issuedDate: yup.string().required("Date is required"),
      validTill: yup.string().required("Valid till is required"),
    })
  ),
});

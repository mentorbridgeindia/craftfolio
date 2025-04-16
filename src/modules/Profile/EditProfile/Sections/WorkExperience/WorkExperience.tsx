import { useFieldArray, useFormContext } from "react-hook-form";
import { ErrorMessage, FieldGroup, Label, Section, SectionTitle } from "../EditProfile.styled";
import { Input } from "../fields/BaseField.styled";
import { ProfileFormData } from "../types";

export function WorkExperience() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ProfileFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  });

  return (
    <Section>
      <SectionTitle>Work Experience</SectionTitle>
      {fields.map((field, index) => (
        <div key={field.id}>
          <FieldGroup>
            <Label htmlFor={`workExperience.${index}.companyName`}>
              Company Name
            </Label>
            <Input
              id={`workExperience.${index}.companyName`}
              {...register(`workExperience.${index}.companyName`)}
              placeholder="Enter company name"
            />
            {errors.workExperience?.[index]?.companyName && (
              <ErrorMessage>
                {errors.workExperience[index]?.companyName?.message}
              </ErrorMessage>
            )}
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor={`workExperience.${index}.designation`}>
              Designation
            </Label>
            <Input
              id={`workExperience.${index}.designation`}
              {...register(`workExperience.${index}.designation`)}
              placeholder="Enter your designation"
            />
            {errors.workExperience?.[index]?.designation && (
              <ErrorMessage>
                {errors.workExperience[index]?.designation?.message}
              </ErrorMessage>
            )}
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor={`workExperience.${index}.from`}>From</Label>
            <Input
              id={`workExperience.${index}.from`}
              type="date"
              {...register(`workExperience.${index}.from`)}
            />
            {errors.workExperience?.[index]?.from && (
              <ErrorMessage>
                {errors.workExperience[index]?.from?.message}
              </ErrorMessage>
            )}
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor={`workExperience.${index}.isCurrentlyWorking`}>
              Currently Working Here
            </Label>
            <input
              type="checkbox"
              id={`workExperience.${index}.isCurrentlyWorking`}
              {...register(`workExperience.${index}.isCurrentlyWorking`)}
            />
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor={`workExperience.${index}.till`}>Till</Label>
            <Input
              id={`workExperience.${index}.till`}
              type="date"
              {...register(`workExperience.${index}.till`)}
              disabled={field.isCurrentlyWorking}
            />
            {errors.workExperience?.[index]?.till && (
              <ErrorMessage>
                {errors.workExperience[index]?.till?.message}
              </ErrorMessage>
            )}
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor={`workExperience.${index}.location`}>Location</Label>
            <Input
              id={`workExperience.${index}.location`}
              {...register(`workExperience.${index}.location`)}
              placeholder="Enter location"
            />
            {errors.workExperience?.[index]?.location && (
              <ErrorMessage>
                {errors.workExperience[index]?.location?.message}
              </ErrorMessage>
            )}
          </FieldGroup>

          <button type="button" onClick={() => remove(index)}>
            Remove Experience
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            id: "",
            companyName: "",
            designation: "",
            from: "",
            till: "",
            isCurrentlyWorking: false,
            location: "",
          })
        }
      >
        Add Experience
      </button>
    </Section>
  );
}

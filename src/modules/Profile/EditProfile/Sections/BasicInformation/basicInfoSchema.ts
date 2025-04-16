import { z } from "zod";

export const basicInfoSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  profilePicture: z.instanceof(File).optional(),
  shortBio: z
    .string()
    .nonempty("Short bio is required")
    .max(100, "Short bio must be at most 100 characters"),
  detailedBio: z
    .string()
    .max(5000, "Detailed bio must be at most 5000 characters")
    .optional(),
});

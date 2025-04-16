import { z } from "zod";

export const awardSchema = z.object({
  awards: z.array(
    z.object({
      id: z.string().nonempty(),
      name: z.string().nonempty("Award name is required"),
      awardedBy: z.string().nonempty("Awarded by is required"),
      date: z.string().nonempty("Date is required"),
    })
  ),
});

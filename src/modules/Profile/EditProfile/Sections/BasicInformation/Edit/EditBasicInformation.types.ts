import { z } from "zod";
import { basicInfoSchema } from "../basicInfoSchema";

export interface EditBasicInformationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof basicInfoSchema>) => void;
  defaultValues?: Partial<z.infer<typeof basicInfoSchema>>;
}

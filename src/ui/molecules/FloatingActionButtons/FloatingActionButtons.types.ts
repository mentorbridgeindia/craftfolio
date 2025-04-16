import { LucideIcon } from "lucide-react";

export interface SocialIcon {
  readonly Icon: LucideIcon;
  readonly href?: string;
  readonly className?: string;
}

export interface FloatingActionButtonsProps {
  readonly icons: SocialIcon[];
  readonly className?: string;
  readonly iconSize?: number;
}

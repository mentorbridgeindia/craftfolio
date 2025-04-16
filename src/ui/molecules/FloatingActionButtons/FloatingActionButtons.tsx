"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { FloatingActionButtonsProps } from "./FloatingActionButtons.types";

export function FloatingActionButtons({
  icons,
  className,
  iconSize = 20,
}: Readonly<FloatingActionButtonsProps>) {
  const [active, setActive] = useState(false);

  const buttonSize = "size-5 sm:size-8";

  return (
    <div
      className={cn(
        "w-full relative flex items-start justify-start sm:justify-center",
        className
      )}
    >
      <div className="flex items-center justify-center relative gap-4">
        <motion.div
          className="absolute left-0 bg-background w-full rounded-full z-10"
          animate={{
            x: active ? "calc(100% + 16px)" : 0,
          }}
          transition={{ type: "ease-in", duration: 0.5 }}
        >
          <motion.button
            className={cn(
              buttonSize,
              "rounded-full flex items-center justify-center",
              "bg-primary hover:bg-primary/90 transition-colors"
            )}
            onClick={() => setActive(!active)}
            animate={{ rotate: active ? 45 : 0 }}
            transition={{
              type: "ease-in",
              duration: 0.5,
            }}
          >
            <Share2
              size={iconSize}
              strokeWidth={3}
              className="text-primary-foreground"
            />
          </motion.button>
        </motion.div>

        {icons.map(({ Icon, href, className }, index) => (
          <motion.div
            key={index}
            className={cn(
              buttonSize,
              "rounded-full flex items-center justify-center",
              "bg-background shadow-lg hover:shadow-xl",
              "border border-border",
              className
            )}
            animate={{
              filter: active ? "blur(0px)" : "blur(2px)",
              scale: active ? 1 : 0.9,
              rotate: active ? 0 : 45,
            }}
            transition={{
              type: "ease-in",
              duration: 0.4,
            }}
          >
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Icon
                  size={iconSize}
                  className="text-muted-foreground transition-all hover:text-foreground hover:scale-110"
                />
              </a>
            ) : (
              <Icon
                size={iconSize}
                className="text-muted-foreground transition-all hover:text-foreground hover:scale-110"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

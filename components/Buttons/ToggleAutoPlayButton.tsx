"use client"

// REACT
import { useCallback, useState } from "react";
// COMPONENTS
import { type ButtonProps, buttonVariants } from "../ui/Button";
// UTILS
import { cn } from "@/utils/helpers";

export interface ToggleAutoPlayButtonProps extends ButtonProps {}

export function ToggleAutoPlayButton({ className }: ToggleAutoPlayButtonProps) {
    // HOOKS
    const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

    const handleAutoPlay = useCallback(() => {
      setShouldAutoPlay(!shouldAutoPlay);
    }, [shouldAutoPlay]);

    return (
      <button
        onClick={handleAutoPlay}
        className={cn(buttonVariants({ 
          variant: shouldAutoPlay ? "primary" : "secondaryOutlined", 
          size: "sm",
          className
        }))}
      >
        {shouldAutoPlay ? 'AutoPlay: On' : 'AutoPlay: Off'}
      </button>
    );
}
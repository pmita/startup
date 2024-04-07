"use client"

// REACT
import React from "react"
import ReactDOM from "react-dom"
// UTILS
import { cn } from "@/utils/helpers"

interface IDialog extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const DialogPortal = React.forwardRef<HTMLDivElement, IDialog>(({ className, children, ...props }) => {
  return (
    ReactDOM.createPortal((
      <div className={cn(
        "bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer",
        className
      )}
      {...props}
      >
        {children}
      </div>
    ), document.body)
  )
})
DialogPortal.displayName = "DialogPortal";

export const DialogOverlay = React.forwardRef<HTMLDivElement, IDialog>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn(
      "bg-gradient-to-brtext-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden",
      className
    )}
    {...props}
    ref={ref}
    >
      {children}
    </div>
  )
})
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = React.forwardRef<HTMLDivElement, IDialog>(({ className, children, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <div className={cn(
        "bg-neutral fixed z-50 grid w-full gap-4 rounded-b-lg border p-6 shadow-lg animate-in sm:max-w-lg sm:rounded-lg sm:zoom-in-90",
        className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    </DialogPortal>
  )
})
DialogContent.displayName = "DialogContent";

export const DialogHeader = React.forwardRef<HTMLDivElement, IDialog>(({ className, ...props }) => {
  return (
    <div className={cn(
     "flex flex-col gap-5",
      className
      )}
      {...props}
    />
  )
})
DialogHeader.displayName = "DialogHeader";

export const DialogTitle = React.forwardRef<HTMLDivElement, IDialog>(({ className, ...props }) => {
  return (
    <div className={cn(
     "text-sm text-secondary font-bold",
      className
      )}
      {...props}
    />
  )
})
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef<HTMLDivElement, IDialog>(({ className, ...props }) => {
  return (
    <div className={cn(
     "text-sm text-secondary",
      className
      )}
      {...props}
    />
  )
})
DialogDescription.displayName = "DialogDescription";

export const DialogFooter = React.forwardRef<HTMLDivElement, IDialog>(({ className, ...props }) => {
  return (
    <div className={cn(
     "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
      )}
      {...props}
    />
  )
})
DialogFooter.displayName = "DialogFooter";







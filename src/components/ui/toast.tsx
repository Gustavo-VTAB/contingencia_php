import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

export const ToastProvider = ToastPrimitives.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>((props, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    style={{
      position: "fixed",
      bottom: "1rem",
      right: "1rem",
      width: "320px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      zIndex: 9999,
    }}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({ children, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    style={{
      background: "white",
      border: "1px solid #ddd",
      borderRadius: "6px",
      padding: "12px 16px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
    {...props}
  >
    {children}
  </ToastPrimitives.Root>
));
Toast.displayName = "Toast";

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>((props, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    style={{ fontWeight: "bold", fontSize: "14px" }}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>((props, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    style={{ fontSize: "13px", opacity: 0.8 }}
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>((props, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    style={{
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      marginLeft: "10px",
    }}
    {...props}
  >
    ×
  </ToastPrimitives.Close>
));
ToastClose.displayName = "ToastClose";

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

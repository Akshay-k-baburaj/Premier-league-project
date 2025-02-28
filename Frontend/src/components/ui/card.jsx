import React from "react"
import { cn } from "../../lib/util.js"  // Updated import path

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-white text-gray-900 shadow-md",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-blue-600 to-blue-400",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => {
  // Explicitly handle children prop
  if (!children) {
    return null
  }

  return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-bold leading-none tracking-tight text-white text-center",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
})
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      "p-6 pt-0 bg-white",
      className
    )} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }
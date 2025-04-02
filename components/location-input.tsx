"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"

interface LocationInputProps {
  icon: ReactNode
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function LocationInput({ icon, placeholder, value, onChange }: LocationInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div
      className={`flex items-center border rounded-md p-2 ${isFocused ? "border-primary" : "border-input"}`}
      animate={{
        y: 0,
        boxShadow: isFocused ? "0 0 0 2px rgba(124, 58, 237, 0.1)" : "none",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="mr-2">{icon}</div>
      <Input
        className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </motion.div>
  )
}
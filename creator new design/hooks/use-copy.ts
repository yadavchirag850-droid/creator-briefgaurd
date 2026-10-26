"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

export function useCopy(timeout = 1800) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string, message = "Copied to clipboard") => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        toast.success(message)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), timeout)
      } catch {
        toast.error("Clipboard access was blocked by your browser")
      }
    },
    [timeout],
  )

  return { copied, copy }
}

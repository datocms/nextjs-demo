import { cn } from "@/lib/utils"

export function SectionSeparator({ className }: { className?: string }) {
  return (
    <hr
      className={cn(
        "border-accent-2 dark:border-slate-800 mt-28 mb-24",
        className,
      )}
    />
  )
}

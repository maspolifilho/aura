import { cn } from "@/lib/utils";

/**
 * Marca provisória da Aura (wordmark + símbolo abstrato inspirado no logo).
 * TODO: substituir por arquivo vetorial oficial da marca quando disponível.
 */
export function AuraMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-6 w-6 text-primary"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 2c4 6 4 10 0 16-4-6-4-10 0-16Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M20 38c4-6 4-10 0-16-4 6-4 10 0 16Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M2 20c6-4 10-4 16 0-6 4-10 4-16 0Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M38 20c-6-4-10-4-16 0 6 4 10 4 16 0Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
      <span className="font-heading text-lg tracking-[0.3em] text-foreground">
        AURA
      </span>
    </span>
  );
}

import { cn } from "@/lib/utils"
import { InputButton } from "@/components/test_embed/Input"

type SearchProps = {
  value: string
  status: string
  handleChange: (e: any) => void
  handleClick: (e: any) => void
  loading: boolean
  placeholder: string
  className?: string
}

export function SearchInput({
  value,
  status,
  handleChange,
  handleClick,
  loading,
  placeholder,
  className,
}: SearchProps) {
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      return handleClick(e)
    }
  }

  return (
    <div className="flex w-full max-w-lg items-center space-x-2">
      <InputButton
        className={cn("relative py-5 pr-10", className)}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder={placeholder}
        enterKeyHint="go"
      >
        <div className="relative -ml-10 hidden items-center justify-center md:flex">
          <div className="absolute ml-4 w-14 rounded-r-full">
            {/* <button
              disabled={loading}
              type="submit"
              onClick={handleClick}
              className={cn(
                "group z-10 inline-flex items-center justify-center rounded-full bg-mauve-1 p-3 text-sm md:block",
                "font-semibold text-mauve-12 shadow-sm ring-1 ring-inset ring-mauve-6",
                "hover:scale-105 hover:shadow hover:ring-inset hover:ring-mauve-7 hover:transition hover:duration-300",
                "focus:scale-105 focus:shadow focus:outline-none focus:ring-inset focus:ring-mauve-8 focus:transition focus:duration-300",
                "dark:ring-mauve-6 dark:hover:shadow-[#99d8f5] dark:hover:ring-mauve-8"
              )}
            >
              {loading ? (
                "Loading..."
              ) : status === "typing" || status === "idle" ? (
                "+"
              ) : (
                "✓"
              )}
            </button> */}
          </div>
        </div>
      </InputButton>
    </div>
  )
}
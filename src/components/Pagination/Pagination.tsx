import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../Button/Button"
import type { ButtonProps } from "../Button/Button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

export type PaginationLinkProps = {
    isActive?: boolean
} & ButtonProps

const PaginationLink = ({
    className,
    isActive,
    size = "md", // Default to md for consistency with Button
    variant = "ghost",
    children,
    ...props
}: PaginationLinkProps) => (
    <Button
        aria-current={isActive ? "page" : undefined}
        variant={isActive ? "filled" : variant}
        size={size}
        className={cn(
            "w-10 h-10 p-0", // Force square shape for numbers
            isActive && "pointer-events-none", // Disable click on active page
            className
        )}
        {...props}
    >
        {children}
    </Button>
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
    className,
    ...props
}: Omit<PaginationLinkProps, "children">) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="md"
        variant="outline"
        className={cn("gap-1 pl-2.5 w-auto px-4", className)} // Reset width to auto for text buttons
        startIcon="chevron_left"
        showStartIcon={true}
        {...props}
    >
        <span>Atrás</span>
    </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
    className,
    ...props
}: Omit<PaginationLinkProps, "children">) => (
    <PaginationLink
        aria-label="Go to next page"
        size="md"
        variant="outline"
        className={cn("gap-1 pr-2.5 w-auto px-4", className)} // Reset width to auto for text buttons
        endIcon="chevron_right"
        showEndIcon={true}
        {...props}
    >
        <span>Siguiente</span>
    </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationFirst = ({
    className,
    ...props
}: Omit<PaginationLinkProps, "children">) => (
    <PaginationLink
        aria-label="Go to first page"
        size="md"
        variant="outline"
        className={cn("gap-1 pl-2.5 w-auto px-4", className)}
        startIcon="first_page"
        showStartIcon={true}
        {...props}
    >
        <span>Primero</span>
    </PaginationLink>
)
PaginationFirst.displayName = "PaginationFirst"

const PaginationLast = ({
    className,
    ...props
}: Omit<PaginationLinkProps, "children">) => (
    <PaginationLink
        aria-label="Go to last page"
        size="md"
        variant="outline"
        className={cn("gap-1 pr-2.5 w-auto px-4", className)}
        endIcon="last_page"
        showEndIcon={true}
        {...props}
    >
        <span>Último</span>
    </PaginationLink>
)
PaginationLast.displayName = "PaginationLast"

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
        <span className="material-icons-round text-impulse-neutro-500">more_horiz</span>
        <span className="sr-only">More pages</span>
    </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationFirst,
    PaginationLast,
}

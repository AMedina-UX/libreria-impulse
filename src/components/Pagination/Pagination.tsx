import * as React from "react"
import { cn } from "../../lib/utils"

export type PaginationSize = "sm" | "md" | "lg";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center font-sans", className)}
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
        className={cn("flex flex-row items-center gap-[6px]", className)}
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
    isActive?: boolean;
    size?: PaginationSize;
    darkMode?: boolean;
} & React.ComponentProps<"button">

const PaginationLink = ({
    className,
    isActive,
    size = "md",
    darkMode = false,
    children,
    disabled,
    ...props
}: PaginationLinkProps) => {

    const sizeStyles = {
        sm: "min-w-[24px] h-[24px] px-[4px] py-[4px] text-[12px]",
        md: "min-w-[32px] h-[32px] px-[8px] py-[8px] text-[14px]",
        lg: "min-w-[40px] h-[40px] px-[12px] py-[10px] text-[16px]",
    };

    const defaultStyles = "bg-white border-impulse-neutro-20 text-impulse-neutro-400 dark:bg-impulse-azul-800 dark:border-impulse-azul-700 dark:text-impulse-neutro-200 hover:bg-impulse-neutro-10 dark:hover:bg-impulse-azul-700";
    const activeStyles = "bg-impulse-celeste-100 border-impulse-celeste-100 text-white dark:bg-impulse-celeste-100 dark:border-impulse-celeste-100";
    const disabledStyles = "opacity-30 cursor-not-allowed pointer-events-none";

    return (
        <button
            aria-current={isActive ? "page" : undefined}
            disabled={disabled}
            type="button"
            className={cn(
                "box-border border border-solid content-stretch flex flex-col items-center justify-center relative rounded-[4px] shrink-0 whitespace-nowrap not-italic transition-colors",
                sizeStyles[size],
                isActive ? activeStyles : defaultStyles,
                isActive ? (size === "md" ? "font-bold" : "font-semibold") : "font-medium",
                disabled && disabledStyles,
                darkMode && "dark",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
PaginationLink.displayName = "PaginationLink"

export type PaginationControlProps = {
    text: string;
    startIcon?: string;
    endIcon?: string;
    size?: PaginationSize;
    darkMode?: boolean;
} & React.ComponentProps<"button">;

const PaginationControl = ({
    className,
    text,
    startIcon,
    endIcon,
    size = "md",
    disabled,
    darkMode = false,
    ...props
}: PaginationControlProps) => {

    const sizeStyles = {
        sm: "h-[24px] px-[8px] py-[4px] text-[12px] gap-[4px]",
        md: "h-[32px] px-[8px] text-[14px] gap-[4px]",
        lg: "h-[40px] px-[12px] text-[16px] gap-[8px]"
    };

    const iconSizes = {
        sm: "text-[16px]",
        md: "text-[20px]",
        lg: "text-[24px]"
    };

    return (
        <button
            disabled={disabled}
            type="button"
            className={cn(
                "box-border bg-white border border-solid border-impulse-neutro-20 content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 text-impulse-neutro-400 whitespace-nowrap not-italic font-light transition-colors hover:bg-impulse-neutro-10",
                "dark:bg-impulse-azul-800 dark:border-impulse-azul-700 dark:text-impulse-neutro-200 dark:hover:bg-impulse-azul-700",
                disabled && "opacity-30 cursor-not-allowed pointer-events-none hover:bg-white dark:hover:bg-transparent",
                sizeStyles[size],
                darkMode && "dark",
                className
            )}
            {...props}
        >
            {startIcon && <span className={cn("material-icons-round", iconSizes[size])}>{startIcon}</span>}
            <span>{text}</span>
            {endIcon && <span className={cn("material-icons-round", iconSizes[size])}>{endIcon}</span>}
        </button>
    );
};

const PaginationPrevious = ({ className, ...props }: Omit<PaginationControlProps, "text" | "startIcon">) => (
    <PaginationControl text="Atrás" startIcon="chevron_left" className={className} {...props} />
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, ...props }: Omit<PaginationControlProps, "text" | "endIcon">) => (
    <PaginationControl text="Siguiente" endIcon="chevron_right" className={className} {...props} />
)
PaginationNext.displayName = "PaginationNext"

const PaginationFirst = ({ className, ...props }: Omit<PaginationControlProps, "text" | "startIcon">) => (
    <PaginationControl text="Primero" startIcon="first_page" className={className} {...props} />
)
PaginationFirst.displayName = "PaginationFirst"

const PaginationLast = ({ className, ...props }: Omit<PaginationControlProps, "text" | "endIcon">) => (
    <PaginationControl text="Último" endIcon="last_page" className={className} {...props} />
)
PaginationLast.displayName = "PaginationLast"

export type PaginationEllipsisProps = {
    size?: PaginationSize;
    darkMode?: boolean;
    hiddenPages?: number[];
    onPageSelect?: (page: number) => void;
} & Omit<React.ComponentProps<"button">, "onSelect">;

const PaginationEllipsis = ({
    className,
    size = "md",
    darkMode = false,
    hiddenPages,
    onPageSelect,
    ...props
}: PaginationEllipsisProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const sizeStyles = {
        sm: "min-w-[24px] h-[24px] text-[16px]",
        md: "min-w-[32px] h-[32px] text-[20px]",
        lg: "min-w-[40px] h-[40px] text-[24px]",
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => hiddenPages && hiddenPages.length > 0 && setIsOpen(!isOpen)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className={cn(
                    "cursor-pointer box-border bg-white border border-solid border-impulse-neutro-20 text-impulse-neutro-400 content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 transition-colors",
                    (!hiddenPages || hiddenPages.length === 0) ? "" : "hover:bg-impulse-neutro-10 dark:hover:bg-impulse-azul-700",
                    "dark:bg-impulse-azul-800 dark:border-impulse-azul-700 dark:text-impulse-neutro-200",
                    sizeStyles[size],
                    darkMode && "dark",
                    className
                )}
                {...props}
            >
                <span className="material-icons-round">more_horiz</span>
                <span className="sr-only">More pages</span>
            </button>
            {isOpen && hiddenPages && hiddenPages.length > 0 && (
                <ul className={cn(
                    "absolute z-50 bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2 bg-white dark:bg-impulse-azul-800 border border-impulse-neutro-200 dark:border-impulse-azul-700 rounded shadow-md max-h-40 overflow-y-auto w-16 text-center text-sm py-1 font-sans",
                    darkMode && "dark"
                )}>
                    {hiddenPages.map(p => (
                        <li key={p}>
                            <button
                                type="button"
                                className="w-full py-1 hover:bg-impulse-neutro-50 dark:hover:bg-impulse-azul-700 text-impulse-neutro-900 dark:text-impulse-neutro-100 transition-colors"
                                onClick={() => {
                                    onPageSelect?.(p);
                                    setIsOpen(false);
                                }}
                            >
                                {p}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
PaginationEllipsis.displayName = "PaginationEllipsis"

export type PaginationResultPerPageProps = {
    value: string | number;
    size?: PaginationSize;
    darkMode?: boolean;
} & React.ComponentProps<"div">;

const PaginationResultPerPage = ({
    className,
    value,
    size = "md",
    darkMode = false,
    ...props
}: PaginationResultPerPageProps) => {
    const sizeStyles = {
        sm: "h-[24px] px-[8px] py-[4px] text-[12px] gap-[4px]",
        md: "h-[32px] px-[8px] text-[14px] gap-[8px]",
        lg: "h-[40px] px-[12px] text-[16px] gap-[8px]"
    };

    const iconSizes = {
        sm: "text-[16px]",
        md: "text-[20px]",
        lg: "text-[24px]"
    };

    return (
        <div
            className={cn(
                "box-border bg-white border border-solid border-impulse-neutro-20 content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 transition-colors text-impulse-neutro-400 font-light cursor-pointer select-none hover:bg-impulse-neutro-10",
                "dark:bg-impulse-azul-800 dark:border-impulse-azul-700 dark:text-impulse-neutro-200 dark:hover:bg-impulse-azul-700",
                sizeStyles[size],
                darkMode && "dark",
                className
            )}
            {...props}
        >
            <span className="whitespace-nowrap flex-1 text-center">{value}</span>
            <span className={cn("material-icons-round shrink-0", iconSizes[size])}>keyboard_arrow_down</span>
        </div>
    )
}
PaginationResultPerPage.displayName = "PaginationResultPerPage"

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
    PaginationResultPerPage
}

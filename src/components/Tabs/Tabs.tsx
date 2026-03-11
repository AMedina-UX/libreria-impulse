import * as React from "react";
import { cn } from "../../lib/utils";

export type TabsVariant = "primary" | "secondary";
export type TabsOrientation = "horizontal" | "vertical";
export type TabsSize = "sm" | "md";

interface TabsContextValue {
    value: string;
    onValueChange: (value: string) => void;
    orientation: TabsOrientation;
    variant: TabsVariant;
    darkMode: boolean;
    size: TabsSize;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
    const context = React.useContext(TabsContext);
    if (!context) {
        throw new Error("Tabs compound components must be used within a Tabs component");
    }
    return context;
}

export interface TabsProps {
    value: string;
    onValueChange: (value: string) => void;
    orientation?: TabsOrientation;
    variant?: TabsVariant;
    darkMode?: boolean;
    size?: TabsSize;
    className?: string;
    children: React.ReactNode;
}

export function Tabs({
    value,
    onValueChange,
    orientation = "horizontal",
    variant = "primary",
    darkMode = false,
    size = "md",
    className,
    children,
}: TabsProps) {
    return (
        <TabsContext.Provider value={{ value, onValueChange, orientation, variant, darkMode, size }}>
            <div
                className={cn(
                    "flex",
                    orientation === "horizontal" ? "flex-col" : "flex-row",
                    darkMode && "dark",
                    className
                )}
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
}

export type TabsListProps = React.HTMLAttributes<HTMLDivElement>;

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
    ({ className, ...props }, ref) => {
        const { orientation, variant } = useTabsContext();

        return (
            <div
                ref={ref}
                role="tablist"
                aria-orientation={orientation}
                className={cn(
                    "flex flex-nowrap",
                    orientation === "horizontal" ? "flex-row" : "flex-col",
                    variant === "primary" && orientation === "horizontal" && "border-b border-impulse-neutro-50 dark:border-impulse-neutro-100",
                    className
                )}
                {...props}
            />
        );
    }
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    startIcon?: string;
    endIcon?: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ className, value, children, startIcon, endIcon, disabled, ...props }, ref) => {
        const { value: selectedValue, onValueChange, orientation, variant, size } = useTabsContext();
        const isSelected = selectedValue === value;

        // Dynamic classes based on sizes
        const sizeClasses = {
            sm: cn("h-[32px] gap-[4px]", orientation === "horizontal" ? "px-[8px]" : "px-[12px] py-[4px]"),
            md: cn("gap-[8px] px-[12px]", orientation === "vertical" && "py-[8px]", orientation === "horizontal" && "py-[12px]"),
        };

        const iconSizeClass = size === "sm" ? "text-[16px]" : "text-[20px]";

        // Text typography variations
        const typographyClasses = {
            sm: cn("text-[12px] leading-[16px]", isSelected ? "font-semibold" : "font-medium"),
            md: cn("text-[14px] leading-[20px]", isSelected && variant !== "secondary" ? "font-semibold" : "font-medium"),
        };

        return (
            <button
                ref={ref}
                type="button"
                role="tab"
                aria-selected={isSelected}
                disabled={disabled}
                onClick={() => onValueChange(value)}
                className={cn(
                    "relative flex box-border items-center justify-center whitespace-nowrap transition-colors outline-none",
                    orientation === "vertical" && "flex-col",
                    sizeClasses[size],

                    // --- PRIMARY VARIANT ---
                    variant === "primary" && cn(
                        "text-impulse-azul-700 dark:text-impulse-neutro-100", // Default text
                        "hover:text-impulse-azul-700 dark:hover:text-white", // Hover text
                        isSelected && "text-impulse-celeste-100 dark:text-white border-b-impulse-celeste-100" // Active text
                    ),
                    variant === "primary" && orientation === "horizontal" && cn(
                        "-mb-[1px] border-b-4 border-solid",
                        isSelected
                            ? "border-b-impulse-celeste-100 dark:border-b-impulse-celeste-100" // Active Border
                            : "border-b-transparent hover:border-b-impulse-neutro-100 dark:hover:border-b-white" // Hover Border
                    ),

                    // --- SECONDARY VARIANT ---
                    variant === "secondary" && cn(
                        "text-impulse-azul-700 dark:text-white",
                        !isSelected && "hover:text-impulse-azul-700 dark:hover:text-white",
                        isSelected && "text-impulse-celeste-100 dark:text-white"
                    ),
                    variant === "secondary" && orientation === "horizontal" && cn(
                        "py-[12px]"
                    ),

                    // --- DISABLED STATE ---
                    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                    className
                )}
                {...props}
            >
                {/* Optional Start Icon */}
                {startIcon && (
                    <span
                        className={cn(
                            "material-icons-round shrink-0 leading-none",
                            iconSizeClass,
                            isSelected && variant === "primary" && "text-impulse-celeste-100 dark:text-white",
                            isSelected && variant === "secondary" && "text-white",
                            !isSelected && "group-hover:text-inherit"
                        )}
                    >
                        {startIcon}
                    </span>
                )}

                {/* Main Text */}
                <div className={cn("flex flex-col justify-center leading-none", typographyClasses[size])}>
                    {children}
                </div>

                {/* Optional End Icon */}
                {endIcon && (
                    <span
                        className={cn(
                            "material-icons-round shrink-0 leading-none",
                            iconSizeClass,
                            isSelected && variant === "primary" && "text-impulse-celeste-100 dark:text-white",
                            isSelected && variant === "secondary" && "text-white",
                            !isSelected && "group-hover:text-inherit"
                        )}
                    >
                        {endIcon}
                    </span>
                )}

                {/* Active Indicator Overlay */}
                {isSelected && (
                    <>
                        {/* Secondary Horizontal pill indicator */}
                        {variant === "secondary" && orientation === "horizontal" && (
                            <span
                                className={cn(
                                    "absolute bottom-0 left-1/2 -translate-x-1/2 w-[40px] h-[4px] rounded-t-[20px]",
                                    "bg-impulse-celeste-100 dark:bg-white"
                                )}
                            />
                        )}

                        {/* Vertical pill indicator */}
                        {orientation === "vertical" && (
                            <span
                                className={cn(
                                    "absolute bottom-0 left-1/2 -translate-x-1/2 w-[20px] h-[4px] rounded-t-[20px]",
                                    "bg-impulse-celeste-100 dark:bg-white"
                                )}
                            />
                        )}
                    </>
                )}
            </button>
        );
    }
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, value, children, ...props }, ref) => {
        const { value: selectedValue } = useTabsContext();

        if (selectedValue !== value) {
            return null; // Don't render if not selected
        }

        return (
            <div
                ref={ref}
                role="tabpanel"
                className={cn("mt-4 outline-none", className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);
TabsContent.displayName = "TabsContent";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The progress value (0 to max) */
    value?: number;
    /** The maximum possible value */
    max?: number;
    /** The size variant determining the height of the bar */
    size?: "sm" | "md" | "lg";
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ className, value = 0, max = 100, size = "md", ...props }, ref) => {
        // Ensure percentage is safely clamped between 0 and 100
        const percentage = Math.min(100, Math.max(0, (value / max) * 100));

        const sizePx = {
            sm: 5,
            md: 10,
            lg: 15,
        };

        return (
            <div
                ref={ref}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
                className={cn(
                    "relative w-full overflow-hidden rounded-full",
                    className
                )}
                style={{
                    height: sizePx[size],
                    backgroundColor: 'var(--color-impulse-neutro-50)',
                    ...props.style // Users can override dynamically
                }}
                {...props}
            >
                <div
                    className="h-full rounded-full transition-all duration-300 ease-in-out"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: 'var(--color-impulse-azul-400)'
                    }}
                />
            </div>
        );
    }
);
ProgressBar.displayName = "ProgressBar";


export interface ProgressCircularProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The progress value (0 to max) */
    value?: number;
    /** The maximum possible value */
    max?: number;
    /** Optional pixel size for the SVG container, defaults to 48px to match Figma */
    size?: number;
}

export const ProgressCircular = React.forwardRef<HTMLDivElement, ProgressCircularProps>(
    ({ className, value = 0, max = 100, size = 48, ...props }, ref) => {
        // Clamp percentage 0-100
        const percentage = Math.min(100, Math.max(0, (value / max) * 100));

        // SVG circle mathematics
        const strokeWidth = 10;
        const radius = 50 - strokeWidth / 2;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        return (
            <div
                ref={ref}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
                className={cn("relative inline-flex items-center justify-center", className)}
                style={{ width: size, height: size }}
                {...props}
            >
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full transform -rotate-90" // Rotate defaults circle start to top
                >
                    {/* Background Track */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        className="text-impulse-neutro-50 dark:text-impulse-neutro-400"
                        style={{ color: "var(--color-impulse-neutro-50)" }}
                    />
                    {/* Indicator Track */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeLinecap="round"
                        className={cn(
                            "text-impulse-azul-400 dark:text-impulse-celeste-100 transition-all duration-300 ease-in-out",
                            percentage === 0 && "opacity-0" // Hide the stub when exactly 0
                        )}
                        style={{ color: "var(--color-impulse-azul-400)", ...props.style }}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>
            </div>
        );
    }
);
ProgressCircular.displayName = "ProgressCircular";

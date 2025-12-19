import React from 'react';
import { cn } from '../../lib/utils';
// Note: Imports below are for reference to tokens if needed, but we use the class names directly for now
// to ensure we match the token system as used in the project configuration.

export type CheckboxSize = 's' | 'm' | 'l';
export type CheckboxColor = 'primary' | 'gray' | 'green' | 'yellow' | 'red';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
    /**
     * The size of the checkbox
     * @default 'm'
     */
    size?: CheckboxSize;
    /**
     * The color theme of the checkbox
     * @default 'primary'
     */
    color?: CheckboxColor;
    /**
     * The label text to display next to the checkbox
     */
    label?: string;
    /**
     * Whether the checkbox is in an error state
     */
    error?: boolean;
}

const CheckIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
    className,
    size = 'm',
    color = 'primary',
    label,
    disabled = false,
    id,
    ...props
}, ref) => {
    // Generate unique ID if not provided, for label association
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const sizes = {
        s: {
            container: "gap-2",
            box: "w-4 h-4 rounded-[4px]",
            icon: "w-3 h-3",
            label: "text-xs",
            halo: "before:w-8 before:h-8",
        },
        m: {
            container: "gap-2.5",
            box: "w-5 h-5 rounded-[4px]",
            icon: "w-3.5 h-3.5",
            label: "text-sm",
            halo: "before:w-10 before:h-10",
        },
        l: {
            container: "gap-3",
            box: "w-6 h-6 rounded-[6px]",
            icon: "w-4 h-4",
            label: "text-base",
            halo: "before:w-12 before:h-12",
        },
    };

    const colors = {
        primary: {
            // Updated to match reference: Unchecked border is neutral, Checked is Azul 60 (Brighter Blue)
            border: "border-impulse-neutro-400 dark:border-impulse-neutro-200",
            bgChecked: "bg-impulse-azul-60 dark:bg-impulse-azul-60",
            borderChecked: "border-impulse-azul-60 dark:border-impulse-azul-60",
            hoverHalo: "group-hover:before:bg-impulse-azul-60/10 dark:group-hover:before:bg-impulse-azul-60/20",
        },
        gray: {
            border: "border-impulse-neutro-400 dark:border-impulse-neutro-400",
            bgChecked: "bg-impulse-neutro-600 dark:bg-impulse-neutro-600",
            borderChecked: "border-impulse-neutro-600 dark:border-impulse-neutro-600",
            hoverHalo: "group-hover:before:bg-impulse-neutro-600/10 dark:group-hover:before:bg-impulse-neutro-400/20",
        },
        green: {
            border: "border-semantic-exito-100 dark:border-semantic-exito-100",
            bgChecked: "bg-semantic-exito-100 dark:bg-semantic-exito-100",
            borderChecked: "border-semantic-exito-100 dark:border-semantic-exito-100",
            hoverHalo: "group-hover:before:bg-semantic-exito-100/10 dark:group-hover:before:bg-semantic-exito-100/20",
        },
        yellow: {
            border: "border-semantic-advertencia-100 dark:border-semantic-advertencia-100",
            bgChecked: "bg-semantic-advertencia-100 dark:bg-semantic-advertencia-100",
            borderChecked: "border-semantic-advertencia-100 dark:border-semantic-advertencia-100",
            hoverHalo: "group-hover:before:bg-semantic-advertencia-100/10 dark:group-hover:before:bg-semantic-advertencia-100/20",
        },
        red: {
            border: "border-semantic-error-100 dark:border-semantic-error-100",
            bgChecked: "bg-semantic-error-100 dark:bg-semantic-error-100",
            borderChecked: "border-semantic-error-100 dark:border-semantic-error-100",
            hoverHalo: "group-hover:before:bg-semantic-error-100/10 dark:group-hover:before:bg-semantic-error-100/20",
        },
    };

    const currentSize = sizes[size];
    const currentColor = colors[color];

    return (
        <label
            htmlFor={inputId}
            className={cn(
                "inline-flex items-center group cursor-pointer relative",
                disabled && "opacity-50 cursor-not-allowed",
                currentSize.container,
                className
            )}
        >
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    id={inputId}
                    ref={ref}
                    disabled={disabled}
                    className="peer sr-only"
                    {...props}
                />

                {/* Visual Checkbox */}
                <div className={cn(
                    "flex items-center justify-center transition-all duration-200 ease-in-out border-2",

                    // Size
                    currentSize.box,

                    // Default State (Unchecked)
                    "bg-transparent",
                    currentColor.border,

                    // Checked State
                    `peer-checked:${currentColor.bgChecked}`,
                    `peer-checked:${currentColor.borderChecked}`,
                    "peer-checked:text-white",

                    // Halo (Hover Effect)
                    "before:content-[''] before:absolute before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2",
                    "before:opacity-0 before:transition-opacity before:duration-200",
                    "before:-z-10", // Ensure halo is behind
                    currentSize.halo,
                    !disabled && currentColor.hoverHalo,
                    !disabled && "group-hover:before:opacity-100", // Using group-hover for reliable trigger

                    // Focus State (Using focus-visible on the hidden input to style the sibling)
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-impulse-azul-100",

                    // Disabled Style Overrides
                    disabled && "border-impulse-neutro-200 bg-impulse-neutro-50 dark:border-impulse-neutro-700 dark:bg-impulse-neutro-800",
                    disabled && "peer-checked:bg-impulse-neutro-300 peer-checked:border-impulse-neutro-300 dark:peer-checked:bg-impulse-neutro-600 dark:peer-checked:border-impulse-neutro-600",

                    // Interactive Scale
                    !disabled && "peer-active:scale-95"
                )}>
                    <CheckIcon className={cn(
                        "transition-transform duration-200",
                        "scale-0 opacity-0",
                        "peer-checked:scale-100 peer-checked:opacity-100",
                        currentSize.icon
                    )} />
                </div>
            </div>

            {label && (
                <span className={cn(
                    "font-normal text-impulse-neutro-900 dark:text-impulse-neutro-100 select-none",
                    disabled && "cursor-not-allowed",
                    currentSize.label
                )}>
                    {label}
                </span>
            )}
        </label>
    );
});

Checkbox.displayName = 'Checkbox';

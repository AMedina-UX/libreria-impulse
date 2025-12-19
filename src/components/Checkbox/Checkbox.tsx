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
            icon: "text-[20px]",
            label: "text-xs",
            halo: "before:w-8 before:h-8",
        },
        m: {
            container: "gap-2.5",
            icon: "text-[24px]",
            label: "text-sm",
            halo: "before:w-10 before:h-10",
        },
        l: {
            container: "gap-3",
            icon: "text-[28px]",
            label: "text-base",
            halo: "before:w-12 before:h-12",
        },
    };

    const colors = {
        primary: {
            // Unchecked: Neutral gray
            unchecked: "text-impulse-neutro-400 dark:text-impulse-neutro-200",
            // Checked: Brand color
            checked: "text-impulse-azul-60 dark:text-impulse-azul-60",
            hoverHalo: "group-hover:before:bg-impulse-azul-60/10 dark:group-hover:before:bg-impulse-azul-60/20",
        },
        gray: {
            unchecked: "text-impulse-neutro-400 dark:text-impulse-neutro-400",
            checked: "text-impulse-neutro-600 dark:text-impulse-neutro-600",
            hoverHalo: "group-hover:before:bg-impulse-neutro-600/10 dark:group-hover:before:bg-impulse-neutro-400/20",
        },
        green: {
            unchecked: "text-impulse-neutro-400 dark:text-impulse-neutro-200", // Keep unchecked neutral usually? Or "text-semantic-exito-100" if we want colored borders? Sticking to design pattern where unchecked is gray usually.
            // Actually usually colored checkboxes might want colored border. Let's stick to neutral unchecked for now unless specified.
            checked: "text-semantic-exito-100 dark:text-semantic-exito-100",
            hoverHalo: "group-hover:before:bg-semantic-exito-100/10 dark:group-hover:before:bg-semantic-exito-100/20",
        },
        yellow: {
            unchecked: "text-impulse-neutro-400 dark:text-impulse-neutro-200",
            checked: "text-semantic-advertencia-100 dark:text-semantic-advertencia-100",
            hoverHalo: "group-hover:before:bg-semantic-advertencia-100/10 dark:group-hover:before:bg-semantic-advertencia-100/20",
        },
        red: {
            unchecked: "text-impulse-neutro-400 dark:text-impulse-neutro-200",
            checked: "text-semantic-error-100 dark:text-semantic-error-100",
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
            <div className={cn(
                "relative flex items-center justify-center rounded-full",
                // Halo (Hover Effect) - moved to this container
                "before:content-[''] before:absolute before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2",
                "before:opacity-0 before:transition-opacity before:duration-200",
                "before:-z-10", // Ensure halo is behind
                currentSize.halo,
                !disabled && currentColor.hoverHalo,
                !disabled && "group-hover:before:opacity-100"
            )}>
                <input
                    type="checkbox"
                    id={inputId}
                    ref={ref}
                    disabled={disabled}
                    className="peer sr-only"
                    {...props}
                />

                {/* Unchecked Icon - Visible by default, hidden when checked */}
                <span className={cn(
                    "material-icons-round select-none transition-transform duration-200",
                    currentSize.icon,
                    currentColor.unchecked,
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", // Center absolute
                    "scale-100 opacity-100", // Default visible
                    "peer-checked:scale-0 peer-checked:opacity-0", // Hide when checked
                    disabled && "text-impulse-neutro-200 dark:text-impulse-neutro-600"
                )}>
                    check_box_outline_blank
                </span>

                {/* Checked Icon - Hidden by default, visible when checked */}
                <span className={cn(
                    "material-icons-round select-none transition-transform duration-200",
                    currentSize.icon,
                    currentColor.checked,
                    "relative", // Keeps the size of the container
                    "scale-0 opacity-0", // Default hidden
                    "peer-checked:scale-100 peer-checked:opacity-100", // Show when checked
                    disabled && "text-impulse-neutro-300 dark:text-impulse-neutro-500"
                )}>
                    check_box
                </span>

                {/* Focus Ring Helper - Absolute overlay to show focus ring since input is hidden */}
                <div className="absolute inset-0 rounded-sm pointer-events-none peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-impulse-azul-100"></div>
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

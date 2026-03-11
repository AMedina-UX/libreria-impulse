import React from 'react';
import { cn } from '../../lib/utils';

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
    /**
     * Optional dark mode override
     */
    darkMode?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
    className,
    size = 'm',
    color = 'primary',
    label,
    disabled = false,
    darkMode = false,
    id,
    ...props
}, ref) => {
    // Generate unique ID if not provided, for label association
    const generatedId = React.useId();
    const inputId = id || generatedId;

    // Figma specific sizes
    const sizes = {
        s: {
            container: "gap-2",
            icon: "!text-[20px]",
            label: "text-sm",
            halo: "w-[36px] h-[36px]",
        },
        m: {
            container: "gap-2.5",
            icon: "!text-[24px]",
            label: "text-sm",
            halo: "w-[40px] h-[40px]",
        },
        l: {
            container: "gap-3",
            icon: "!text-[28px]",
            label: "text-sm",
            halo: "w-[44px] h-[44px]",
        },
    };

    // New color specifications: The unchecked border should match the theme color
    const colors = {
        primary: {
            unchecked: "text-impulse-azul-60 dark:text-impulse-azul-60",
            checked: "text-impulse-azul-60 dark:text-impulse-azul-60",
            hoverHalo: "group-hover:bg-impulse-azul-60/10 dark:group-hover:bg-impulse-azul-60/20",
        },
        gray: {
            unchecked: "text-impulse-neutro-300 dark:text-impulse-neutro-100",
            checked: "text-impulse-neutro-900 dark:text-impulse-neutro-100",
            hoverHalo: "group-hover:bg-impulse-neutro-400/10 dark:group-hover:bg-impulse-neutro-100/20",
        },
        green: {
            unchecked: "text-semantic-exito-100 dark:text-semantic-exito-100",
            checked: "text-semantic-exito-100 dark:text-semantic-exito-100",
            hoverHalo: "group-hover:bg-semantic-exito-100/10 dark:group-hover:bg-semantic-exito-100/20",
        },
        yellow: {
            unchecked: "text-semantic-advertencia-100 dark:text-semantic-advertencia-100",
            checked: "text-semantic-advertencia-100 dark:text-semantic-advertencia-100",
            hoverHalo: "group-hover:bg-semantic-advertencia-100/10 dark:group-hover:bg-semantic-advertencia-100/20",
        },
        red: {
            unchecked: "text-semantic-error-100 dark:text-semantic-error-100",
            checked: "text-semantic-error-100 dark:text-semantic-error-100",
            hoverHalo: "group-hover:bg-semantic-error-100/10 dark:group-hover:bg-semantic-error-100/20",
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
                "relative flex items-center justify-center rounded-full transition-colors duration-200",
                darkMode && "dark",
                currentSize.halo,
                !disabled && currentColor.hoverHalo
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
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    "scale-100 opacity-100",
                    "peer-checked:scale-0 peer-checked:opacity-0",
                    disabled && "text-impulse-neutro-200 dark:text-impulse-neutro-600"
                )}>
                    check_box_outline_blank
                </span>

                {/* Checked Icon - Hidden by default, visible when checked */}
                <span className={cn(
                    "material-icons-round select-none transition-transform duration-200",
                    currentSize.icon,
                    currentColor.checked,
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    "scale-0 opacity-0",
                    "peer-checked:scale-100 peer-checked:opacity-100",
                    disabled && "text-impulse-neutro-300 dark:text-impulse-neutro-500"
                )}>
                    check_box
                </span>

                {/* Focus Ring Helper - Absolute overlay to show focus ring since input is hidden */}
                <div className="absolute inset-0 rounded-full pointer-events-none peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-impulse-azul-100"></div>
            </div>

            {label && (
                <span className={cn(
                    "font-normal text-impulse-neutro-900 select-none",
                    disabled && "text-impulse-neutro-400",
                    currentSize.label
                )}>
                    {label}
                </span>
            )}
        </label>
    );
});

Checkbox.displayName = 'Checkbox';

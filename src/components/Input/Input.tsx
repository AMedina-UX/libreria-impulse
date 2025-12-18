import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * Label for the input
     */
    label?: string;
    /**
     * Whether to show the label
     */
    showLabel?: boolean;
    /**
     * Helper text or error message
     */
    helperText?: string;
    /**
     * State of the input
     */
    state?: 'default' | 'error' | 'disabled';
    /**
     * Explicit error toggle, overrides state='default' or 'disabled' if needed
     */
    error?: boolean;
    /**
     * Size of the input
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Icon to show at the start
     */
    startIcon?: string;
    /**
     * Whether to show the start icon
     */
    showStartIcon?: boolean;
    /**
     * Icon to show at the end
     */
    endIcon?: string;
    /**
     * Whether to show the end icon
     */
    showEndIcon?: boolean;
    /**
     * Whether the input should take up the full width of its container
     */
    fullWidth?: boolean;
}

export const Input = ({
    label = 'Label',
    showLabel = true,
    helperText,
    state = 'default',
    error = false,
    size = 'md',
    startIcon,
    showStartIcon = true,
    endIcon,
    showEndIcon = true,
    fullWidth = false,
    className = '',
    disabled,
    id,
    ...props
}: InputProps) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    // Prioritize 'disabled' state or prop
    const isDisabled = state === 'disabled' || disabled;
    // 'error' prop overrides default state, but we usually want disabled to take precedence if both are true
    const isError = error || state === 'error';

    const sizeStyles = {
        sm: 'h-[36px] text-xs px-2',
        md: 'h-[40px] text-sm px-2',
        lg: 'h-[48px] text-base px-2',
    };

    const iconSizes = {
        sm: '!text-[20px]',
        md: '!text-[24px]',
        lg: '!text-[28px]',
    };

    const labelSizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };

    const baseContainerStyles = 'flex items-center gap-2 rounded-lg border transition-colors duration-200 overflow-hidden bg-white dark:bg-impulse-azul-900';

    // State styles for the CONTAINER
    const stateStyles = {
        default: 'border-impulse-neutro-50 focus-within:border-impulse-azul-60 focus-within:ring-1 focus-within:ring-impulse-azul-60 dark:border-impulse-azul-400 dark:text-white',
        error: 'border-semantic-error-100 focus-within:ring-1 focus-within:ring-semantic-error-100 text-semantic-error-100',
        disabled: 'bg-impulse-neutro-20 border-impulse-neutro-50 cursor-not-allowed opacity-60 dark:bg-impulse-azul-800 dark:border-impulse-azul-700',
    };

    const activeStyle = isDisabled ? stateStyles.disabled : isError ? stateStyles.error : stateStyles.default;

    const containerCx = `
        ${baseContainerStyles}
        ${sizeStyles[size]}
        ${activeStyle}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${className}
    `;

    return (
        <div className={`${fullWidth ? 'w-full' : 'w-auto'} flex flex-col gap-1.5 font-sans`}>
            {showLabel && label && (
                <label
                    htmlFor={inputId}
                    className={`${labelSizes[size]} font-medium ${isError ? 'text-semantic-error-100' : isDisabled ? 'text-impulse-neutro-100 dark:text-impulse-neutro-200' : 'text-impulse-neutro-900 dark:text-impulse-neutro-50'}`}
                >
                    {label}
                </label>
            )}

            <div className={containerCx}>
                {showStartIcon && startIcon && (
                    <span className={`material-icons-round ${isError ? 'text-semantic-error-100' : 'text-impulse-neutro-200'} ${iconSizes[size]} select-none`}>
                        {startIcon}
                    </span>
                )}

                <input
                    id={inputId}
                    disabled={isDisabled}
                    className={`
                        flex-1 bg-transparent border-none outline-none placeholder-impulse-neutro-100 dark:placeholder-impulse-neutro-300 dark:text-white
                        ${isDisabled ? 'cursor-not-allowed' : ''}
                        w-full h-full
                    `}
                    {...props}
                />

                {showEndIcon && endIcon && (
                    <span className={`material-icons-round ${isError ? 'text-semantic-error-100' : 'text-impulse-neutro-200'} ${iconSizes[size]} select-none`}>
                        {endIcon}
                    </span>
                )}
            </div>

            {helperText && (
                <div className={`flex items-center gap-1 text-xs ${isError ? 'text-semantic-error-100' : 'text-impulse-neutro-200'}`}>
                    {isError && <span className="material-icons-round !text-[14px]">error</span>}
                    <span>{helperText}</span>
                </div>
            )}
        </div>
    );
};

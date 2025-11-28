import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The visual style of the button
     */
    variant?: 'filled' | 'outline' | 'ghost' | 'link';
    /**
     * The color theme of the button
     */
    color?: 'primary' | 'light' | 'accent' | 'success' | 'warning' | 'destructive';
    /**
     * How large should the button be?
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Is the button in a loading state?
     */
    loading?: boolean;
    /**
     * Button contents
     */
    children: React.ReactNode;
    /**
     * Icon to show at the start (left) of the button
     */
    startIcon?: string;
    /**
     * Icon to show at the end (right) of the button
     */
    endIcon?: string;
    /**
     * Whether to show the start icon
     */
    showStartIcon?: boolean;
    /**
     * Whether to show the end icon
     */
    showEndIcon?: boolean;
}

export const Button = ({
    variant = 'filled',
    color = 'primary',
    size = 'md',
    loading = false,
    children,
    disabled,
    startIcon = 'check',
    endIcon = 'arrow_forward',
    showStartIcon = true,
    showEndIcon = true,
    ...props
}: Omit<ButtonProps, 'className'>) => {

    const baseStyles = 'font-sans font-medium rounded-lg transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';

    const sizeStyles = {
        xs: 'h-[30px] px-[8px] gap-[4px] text-[12px] font-semibold',
        sm: 'h-[36px] px-[8px] gap-[8px] text-[12px] font-semibold',
        md: 'h-[40px] px-[8px] gap-[8px] text-[14px] font-semibold',
        lg: 'h-[48px] px-[12px] gap-[8px] text-[16px] font-semibold',
        xl: 'h-[52px] px-[12px] gap-[8px] text-[16px] font-semibold',
    };

    const iconSizes = {
        xs: '!text-[20px]',
        sm: '!text-[20px]',
        md: '!text-[24px]',
        lg: '!text-[24px]',
        xl: '!text-[28px]',
    };

    const colorStyles = {
        primary: {
            filled: 'bg-impulse-azul-60 text-white hover:bg-impulse-azul-80',
            outline: 'border-2 border-impulse-azul-60 text-impulse-azul-60 hover:bg-impulse-azul-60/10',
            ghost: 'text-impulse-azul-60 hover:bg-impulse-azul-60/10',
            link: 'text-impulse-azul-60 hover:underline',
        },
        light: {
            filled: 'bg-impulse-neutro-10 text-impulse-neutro-900 hover:bg-impulse-neutro-20',
            outline: 'border-2 border-impulse-neutro-900 text-impulse-neutro-900 hover:bg-impulse-neutro-900/10',
            ghost: 'text-impulse-neutro-900 hover:bg-impulse-neutro-900/10',
            link: 'text-impulse-neutro-900 hover:underline',
        },
        accent: {
            filled: 'bg-impulse-acentuador-100 text-white hover:bg-impulse-acentuador-200',
            outline: 'border-2 border-impulse-acentuador-100 text-impulse-acentuador-100 hover:bg-impulse-acentuador-100/10',
            ghost: 'text-impulse-acentuador-100 hover:bg-impulse-acentuador-100/10',
            link: 'text-impulse-acentuador-100 hover:underline',
        },
        success: {
            filled: 'bg-green-600 text-white hover:bg-green-700',
            outline: 'border-2 border-green-600 text-green-600 hover:bg-green-600/10',
            ghost: 'text-green-600 hover:bg-green-600/10',
            link: 'text-green-600 hover:underline',
        },
        warning: {
            filled: 'bg-yellow-500 text-white hover:bg-yellow-600',
            outline: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10',
            ghost: 'text-yellow-500 hover:bg-yellow-500/10',
            link: 'text-yellow-500 hover:underline',
        },
        destructive: {
            filled: 'bg-red-600 text-white hover:bg-red-700',
            outline: 'border-2 border-red-600 text-red-600 hover:bg-red-600/10',
            ghost: 'text-red-600 hover:bg-red-600/10',
            link: 'text-red-600 hover:underline',
        },
    };

    // Link variant overrides padding/height
    const currentSizeStyle = variant === 'link' ? 'p-0 h-auto' : sizeStyles[size];
    const currentColorStyle = colorStyles[color][variant];
    const currentIconSize = iconSizes[size];

    return (
        <button
            type="button"
            className={`${baseStyles} ${currentSizeStyle} ${currentColorStyle}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {!loading && showStartIcon && startIcon && (
                <span className={`material-icons ${currentIconSize} leading-none`}>{startIcon}</span>
            )}
            {children}
            {!loading && showEndIcon && endIcon && (
                <span className={`material-icons ${currentIconSize} leading-none`}>{endIcon}</span>
            )}
        </button>
    );
};

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
}

export const Button = ({
    variant = 'filled',
    color = 'primary',
    size = 'md',
    loading = false,
    children,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {

    const baseStyles = 'font-sans font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';

    const sizeStyles = {
        xs: 'text-xs px-2 py-[5px] gap-2',
        sm: 'text-sm p-2 gap-2',
        md: 'text-base p-2 gap-2',
        lg: 'text-lg p-3 gap-2',
        xl: 'text-xl p-3 gap-2',
    };

    const colorStyles = {
        primary: {
            filled: 'bg-impulse-azul-60 text-white hover:bg-impulse-azul-80 focus:ring-impulse-azul-60',
            outline: 'border-2 border-impulse-azul-60 text-impulse-azul-60 hover:bg-impulse-azul-60/10 focus:ring-impulse-azul-60',
            ghost: 'text-impulse-azul-60 hover:bg-impulse-azul-60/10 focus:ring-impulse-azul-60',
            link: 'text-impulse-azul-60 hover:underline focus:ring-impulse-azul-60',
        },
        light: {
            filled: 'bg-impulse-neutro-10 text-impulse-neutro-900 hover:bg-impulse-neutro-20 focus:ring-impulse-neutro-900',
            outline: 'border-2 border-impulse-neutro-900 text-impulse-neutro-900 hover:bg-impulse-neutro-900/10 focus:ring-impulse-neutro-900',
            ghost: 'text-impulse-neutro-900 hover:bg-impulse-neutro-900/10 focus:ring-impulse-neutro-900',
            link: 'text-impulse-neutro-900 hover:underline focus:ring-impulse-neutro-900',
        },
        accent: {
            filled: 'bg-impulse-acentuador-100 text-white hover:bg-impulse-acentuador-200 focus:ring-impulse-acentuador-100',
            outline: 'border-2 border-impulse-acentuador-100 text-impulse-acentuador-100 hover:bg-impulse-acentuador-100/10 focus:ring-impulse-acentuador-100',
            ghost: 'text-impulse-acentuador-100 hover:bg-impulse-acentuador-100/10 focus:ring-impulse-acentuador-100',
            link: 'text-impulse-acentuador-100 hover:underline focus:ring-impulse-acentuador-100',
        },
        success: {
            filled: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600',
            outline: 'border-2 border-green-600 text-green-600 hover:bg-green-600/10 focus:ring-green-600',
            ghost: 'text-green-600 hover:bg-green-600/10 focus:ring-green-600',
            link: 'text-green-600 hover:underline focus:ring-green-600',
        },
        warning: {
            filled: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
            outline: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 focus:ring-yellow-500',
            ghost: 'text-yellow-500 hover:bg-yellow-500/10 focus:ring-yellow-500',
            link: 'text-yellow-500 hover:underline focus:ring-yellow-500',
        },
        destructive: {
            filled: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
            outline: 'border-2 border-red-600 text-red-600 hover:bg-red-600/10 focus:ring-red-600',
            ghost: 'text-red-600 hover:bg-red-600/10 focus:ring-red-600',
            link: 'text-red-600 hover:underline focus:ring-red-600',
        },
    };

    // Link variant overrides padding/height
    const currentSizeStyle = variant === 'link' ? 'p-0 h-auto' : sizeStyles[size];
    const currentColorStyle = colorStyles[color][variant];

    return (
        <button
            type="button"
            className={`${baseStyles} ${currentSizeStyle} ${currentColorStyle} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
};

import React from 'react';

export interface ImpulseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Button contents
     */
    children: React.ReactNode;
    /**
     * Optional click handler
     */
    onClick?: () => void;
    /**
     * Full width mode
     */
    fullWidth?: boolean;
}

export const ImpulseButton = ({
    children,
    onClick,
    fullWidth = false,
    className = '',
    ...props
}: ImpulseButtonProps) => {
    return (
        <button
            type="button"
            className={`
        relative overflow-hidden group
        font-sans font-bold text-white tracking-wide
        bg-gradient-to-r from-violet-600 to-indigo-600
        hover:from-violet-500 hover:to-indigo-500
        px-8 py-3 rounded-full
        shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50
        transition-all duration-300 transform hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            onClick={onClick}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
        </button>
    );
};

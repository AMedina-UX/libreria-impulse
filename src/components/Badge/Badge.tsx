import React from 'react';

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: BadgeVariant;
    children: React.ReactNode;
    className?: string;
}

export const Badge = ({
    variant = 'default',
    children,
    className = '',
    ...props
}: BadgeProps) => {
    const variants = {
        default: 'bg-blue-600 text-white border-transparent shadow hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-900 border-transparent hover:bg-gray-200',
        outline: 'text-gray-900 border-gray-200 hover:bg-gray-100',
        destructive: 'bg-red-600 text-white border-transparent shadow hover:bg-red-700',
        success: 'bg-green-600 text-white border-transparent shadow hover:bg-green-700',
        warning: 'bg-yellow-500 text-white border-transparent shadow hover:bg-yellow-600',
    };

    const classes = [
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};

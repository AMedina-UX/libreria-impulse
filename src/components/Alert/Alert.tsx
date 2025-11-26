import React from 'react';

type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: AlertVariant;
    title?: string;
    children?: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
}

export const Alert = ({
    variant = 'default',
    title,
    children,
    className = '',
    icon,
    ...props
}: AlertProps) => {
    const variants = {
        default: 'bg-gray-100 text-gray-900 border-gray-200',
        destructive: 'bg-red-50 text-red-900 border-red-200',
        success: 'bg-green-50 text-green-900 border-green-200',
        warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
        info: 'bg-blue-50 text-blue-900 border-blue-200',
    };

    const classes = [
        'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11',
        variants[variant],
        className,
    ].filter(Boolean).join(' ');

    return (
        <div role="alert" className={classes} {...props}>
            {icon && <div className="absolute left-4 top-4">{icon}</div>}
            <div className={icon ? 'ml-2' : ''}>
                {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
                <div className="text-sm [&_p]:leading-relaxed">{children}</div>
            </div>
        </div>
    );
};

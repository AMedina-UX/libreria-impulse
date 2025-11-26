import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    className?: string;
    required?: boolean;
}

export const Label = ({
    children,
    className = '',
    required,
    ...props
}: LabelProps) => {
    return (
        <label
            className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
            {...props}
        >
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
};

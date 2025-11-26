import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
}

export const Checkbox = ({
    label,
    className = '',
    id,
    ...props
}: CheckboxProps) => {
    const generatedId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`flex items-center ${className}`}>
            <input
                id={generatedId}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition duration-150 ease-in-out cursor-pointer"
                {...props}
            />
            {label && (
                <label htmlFor={generatedId} className="ml-2 block text-sm text-gray-900 cursor-pointer select-none">
                    {label}
                </label>
            )}
        </div>
    );
};

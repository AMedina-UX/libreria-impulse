import React from 'react';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
}

export const Switch = ({
    label,
    className = '',
    id,
    ...props
}: SwitchProps) => {
    const generatedId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`flex items-center ${className}`}>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                    type="checkbox"
                    name="toggle"
                    id={generatedId}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-full checked:border-blue-600"
                    {...props}
                />
                <label
                    htmlFor={generatedId}
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in-out peer-checked:bg-blue-600"
                ></label>
            </div>
            {label && (
                <label htmlFor={generatedId} className="text-sm text-gray-900 cursor-pointer select-none">
                    {label}
                </label>
            )}
            <style>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #2563EB; /* blue-600 */
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #2563EB; /* blue-600 */
        }
        .toggle-checkbox {
            right: 16px; /* Initial position */
            border-color: #D1D5DB; /* gray-300 */
        }
      `}</style>
        </div>
    );
};

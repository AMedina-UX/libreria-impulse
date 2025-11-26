import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const Avatar = ({
    src,
    alt,
    fallback,
    size = 'md',
    className = '',
    ...props
}: AvatarProps) => {
    const sizes = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-14 w-14 text-base',
        xl: 'h-20 w-20 text-xl',
    };

    return (
        <div className={`relative flex shrink-0 overflow-hidden rounded-full ${sizes[size]} ${className}`} {...props}>
            {src ? (
                <img className="aspect-square h-full w-full object-cover" src={src} alt={alt} />
            ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium">
                    {fallback || alt?.charAt(0).toUpperCase() || '?'}
                </div>
            )}
        </div>
    );
};

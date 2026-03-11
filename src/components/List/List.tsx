import React from 'react';
import { cn } from '../../lib/utils';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
    children: React.ReactNode;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(({
    children,
    className,
    ...props
}, ref) => {
    return (
        <ul
            ref={ref}
            className={cn(
                "flex flex-col bg-white dark:bg-impulse-azul-900 w-full overflow-hidden",
                className
            )}
            {...props}
        >
            {children}
        </ul>
    );
});

List.displayName = 'List';

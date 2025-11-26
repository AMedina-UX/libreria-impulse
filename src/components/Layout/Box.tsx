import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
    children?: React.ReactNode;
    className?: string;
}

export const Box = ({
    as: Component = 'div',
    children,
    className = '',
    ...props
}: BoxProps) => {
    return (
        <Component className={className} {...props}>
            {children}
        </Component>
    );
};

import React from 'react';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
    columns?: number | string;
    gap?: number;
    children: React.ReactNode;
    className?: string;
}

export const Grid = ({
    as: Component = 'div',
    columns = 1,
    gap = 4,
    children,
    className = '',
    style,
    ...props
}: GridProps) => {
    const gridTemplateColumns = typeof columns === 'number' ? `repeat(${columns}, minmax(0, 1fr))` : columns;

    const classes = [
        'grid',
        className,
    ].filter(Boolean).join(' ');

    return (
        <Component
            className={classes}
            style={{
                gridTemplateColumns,
                gap: `${gap * 0.25}rem`,
                ...style
            }}
            {...props}
        >
            {children}
        </Component>
    );
};

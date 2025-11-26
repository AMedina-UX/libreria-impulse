import React from 'react';

type StackDirection = 'row' | 'column';
type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
    direction?: StackDirection;
    align?: StackAlign;
    justify?: StackJustify;
    gap?: number;
    children: React.ReactNode;
    className?: string;
}

export const Stack = ({
    as: Component = 'div',
    direction = 'column',
    align = 'stretch',
    justify = 'start',
    gap = 4,
    children,
    className = '',
    ...props
}: StackProps) => {
    const directions = {
        row: 'flex-row',
        column: 'flex-col',
    };

    const aligns = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
    };

    const justifies = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
    };

    // Map gap number to Tailwind spacing class (approximate or custom style)
    // For simplicity using style for precise gap if needed, or mapping to standard spacing
    // Tailwind v4 supports arbitrary values easily, but let's use standard classes if possible or style
    // Let's use style for gap to be flexible with numbers

    const classes = [
        'flex',
        directions[direction],
        aligns[align],
        justifies[justify],
        className,
    ].filter(Boolean).join(' ');

    return (
        <Component className={classes} style={{ gap: `${gap * 0.25}rem` }} {...props}>
            {children}
        </Component>
    );
};

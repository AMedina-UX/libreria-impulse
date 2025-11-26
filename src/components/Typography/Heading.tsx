import React from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingWeight = 'medium' | 'semibold' | 'bold' | 'extrabold';
type TextAlign = 'left' | 'center' | 'right';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: HeadingLevel;
    weight?: HeadingWeight;
    align?: TextAlign;
    children: React.ReactNode;
    className?: string;
}

export const Heading = ({
    as: Component = 'h2',
    weight,
    align = 'left',
    children,
    className = '',
    ...props
}: HeadingProps) => {
    const sizes = {
        h1: 'text-4xl md:text-5xl tracking-tight',
        h2: 'text-3xl md:text-4xl tracking-tight',
        h3: 'text-2xl md:text-3xl tracking-tight',
        h4: 'text-xl md:text-2xl tracking-tight',
        h5: 'text-lg md:text-xl tracking-tight',
        h6: 'text-base md:text-lg tracking-tight',
    };

    const defaultWeights = {
        h1: 'font-extrabold',
        h2: 'font-bold',
        h3: 'font-bold',
        h4: 'font-semibold',
        h5: 'font-semibold',
        h6: 'font-medium',
    };

    const aligns = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    const classes = [
        'font-sans text-gray-900',
        sizes[Component],
        weight ? `font-${weight}` : defaultWeights[Component],
        aligns[align],
        className,
    ].filter(Boolean).join(' ');

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
};

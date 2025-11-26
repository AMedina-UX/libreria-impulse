import React from 'react';

type TextVariant = 'body' | 'caption' | 'small' | 'lead' | 'large' | 'muted';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TextAlign = 'left' | 'center' | 'right';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    as?: React.ElementType;
    variant?: TextVariant;
    weight?: TextWeight;
    align?: TextAlign;
    children: React.ReactNode;
    className?: string;
}

export const Text = ({
    as: Component = 'p',
    variant = 'body',
    weight = 'normal',
    align = 'left',
    children,
    className = '',
    ...props
}: TextProps) => {
    const variants = {
        body: 'text-base leading-relaxed',
        caption: 'text-sm text-gray-500',
        small: 'text-xs font-medium leading-none',
        lead: 'text-xl text-gray-500',
        large: 'text-lg font-semibold',
        muted: 'text-sm text-gray-500',
    };

    const weights = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    const aligns = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    const classes = [
        'font-sans',
        variants[variant],
        weights[weight],
        aligns[align],
        className,
    ].filter(Boolean).join(' ');

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
};

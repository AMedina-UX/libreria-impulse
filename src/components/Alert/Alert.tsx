import React from 'react';
import { Button } from '../Button/Button';

type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

export interface AlertAction {
    label: string;
    onClick?: () => void;
    variant?: 'filled' | 'outline' | 'link';
}

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    variant?: AlertVariant;
    title?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    primaryAction?: AlertAction;
    secondaryAction?: AlertAction;
    showActions?: boolean;
    actionsLayout?: 'bot-left' | 'bot-right' | 'right' | 'responsive';
}

const defaultIcons = {
    default: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-impulse-celeste-100)" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM12 9C11.45 9 11 8.55 11 8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8C13 8.55 12.55 9 12 9Z" />
        </svg>
    ),
    info: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-impulse-celeste-100)" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM12 9C11.45 9 11 8.55 11 8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8C13 8.55 12.55 9 12 9Z" />
        </svg>
    ),
    warning: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-semantic-advertencia-100)" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" />
        </svg>
    ),
    destructive: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-semantic-error-100)" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" />
        </svg>
    ),
    success: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-semantic-exito-100)" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10.5 17L5.5 12L6.91 10.59L10.5 14.17L17.09 7.58L18.5 9L10.5 17Z" />
        </svg>
    ),
};

export const Alert = ({
    variant = 'default',
    title,
    children,
    className = '',
    icon,
    primaryAction,
    secondaryAction,
    showActions = true,
    actionsLayout = 'bot-left',
    ...props
}: AlertProps) => {
    const variants = {
        default: 'bg-[var(--color-impulse-celeste-20)] border-[var(--color-impulse-celeste-100)]',
        info: 'bg-[var(--color-impulse-celeste-20)] border-[var(--color-impulse-celeste-100)]',
        warning: 'bg-[var(--color-semantic-advertencia-20)] border-[var(--color-semantic-advertencia-100)]',
        destructive: 'bg-[var(--color-semantic-error-20)] border-[var(--color-semantic-error-100)]',
        success: 'bg-[var(--color-semantic-exito-20)] border-[var(--color-semantic-exito-100)]',
    };

    const classes = [
        'flex w-full shrink-0 items-start gap-[10px] rounded-[6px] border-l-4 border-solid p-[16px]',
        variants[variant],
        className,
    ].filter(Boolean).join(' ');

    const iconToRender = icon !== undefined ? icon : defaultIcons[variant];

    const renderActions = () => {
        if (!showActions || (!primaryAction && !secondaryAction)) return null;

        const layoutClasses = {
            'bot-left': 'mt-4 flex flex-wrap items-center justify-start gap-4',
            'bot-right': 'mt-4 flex flex-wrap items-center justify-end gap-4',
            'responsive': 'mt-4 flex flex-col items-stretch gap-3 w-full',
            'right': 'flex flex-row items-center self-center gap-4 ml-4 shrink-0',
        };

        const isResponsive = actionsLayout === 'responsive';

        return (
            <div className={layoutClasses[actionsLayout]}>
                {primaryAction && (
                    <Button
                        variant={primaryAction.variant || 'filled'}
                        color={variant === 'default' || variant === 'info' ? 'primary' : variant as any}
                        onClick={primaryAction.onClick}
                        size="sm"
                        showStartIcon={false}
                        showEndIcon={false}
                        className={isResponsive ? 'w-full' : ''}
                    >
                        {primaryAction.label}
                    </Button>
                )}
                {secondaryAction && (
                    <Button
                        variant={secondaryAction.variant || 'outline'}
                        color={variant === 'default' || variant === 'info' ? 'primary' : variant as any}
                        onClick={secondaryAction.onClick}
                        size="sm"
                        showStartIcon={false}
                        showEndIcon={false}
                        className={isResponsive ? 'w-full' : ''}
                    >
                        {secondaryAction.label}
                    </Button>
                )}
            </div>
        );
    };

    return (
        <div role="alert" className={classes} {...props}>
            {iconToRender && (
                <div className="relative shrink-0 size-[24px]">
                    {iconToRender}
                </div>
            )}
            <div className="flex min-h-px min-w-px relative flex-[1_0_0] items-center">
                <div className="flex-[1_0_0] text-[var(--color-impulse-azul-300)] font-sans text-[14px] leading-[20px]">
                    {title && <div className="font-medium mb-[4px]">{title}</div>}
                    <div className="[&_p]:leading-[20px]">{children}</div>
                    {actionsLayout !== 'right' && renderActions()}
                </div>
            </div>
            {actionsLayout === 'right' && renderActions()}
        </div>
    );
};

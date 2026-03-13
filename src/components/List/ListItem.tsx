import React from 'react';
import { cn } from '../../lib/utils';
import { Avatar } from '../Avatar/Avatar';

export type ListItemLeadingType = 'monogram' | 'icon' | 'image' | 'video';

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
    /**
     * The primary text of the list item.
     */
    headline: string;
    /**
     * Secondary text to display below the headline.
     */
    supportingText?: string;
    /**
     * Element to display at the start of the item (Avatar, Icon, Image, primitive).
     * If omitted and leadingType is 'monogram', an Avatar is rendered automatically.
     */
    leading?: React.ReactNode;
    /**
     * Type of leading element to adjust spacing and sizing.
     * @default 'icon'
     */
    leadingType?: ListItemLeadingType;
    /**
     * Initials shown in the Avatar when leadingType is 'monogram' and no custom leading is provided.
     * @default 'UX'
     */
    monogramInitials?: string;
    /**
     * Element to display at the end of the item (Icon, meta text).
     */
    trailing?: React.ReactNode;
    /**
     * Whether to show a divider line at the bottom of the item.
     * @default false
     */
    divider?: boolean;
    /**
     * Whether the item is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Number of lines to clamp the supporting text to.
     * @default 2
     */
    lines?: 1 | 2 | 3;
    /**
     * Click handler for the item.
     */
    onClick?: () => void;
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(({
    headline,
    supportingText,
    leading,
    leadingType = 'icon',
    monogramInitials = 'UX',
    trailing,
    divider = false,
    disabled = false,
    lines = 2,
    className,
    onClick,
    ...props
}, ref) => {

    // Determine min-height based on content
    const minHeightClass = !supportingText ? 'min-h-[56px]' : lines === 3 ? 'min-h-[88px]' : 'min-h-[72px]';

    // Si el tipo es monogram y no se pasa leading custom, usamos Avatar automáticamente
    const resolvedLeading: React.ReactNode =
        leadingType === 'monogram' && !leading
            ? <Avatar estilo="Monograma" tamano="md" initials={monogramInitials} />
            : leading;

    const leadingTypeStyles = {
        monogram: "w-10 h-10 rounded-full",
        icon: "w-6 h-6",
        image: "w-10 h-10 object-cover", // 40px
        video: "w-[114px] h-[64px] object-cover",
    };

    const lineClampClass = {
        1: 'truncate',
        2: 'line-clamp-2',
        3: 'line-clamp-3'
    }[lines];

    return (
        <li
            ref={ref}
            className={cn(
                "relative flex items-center px-3 py-2 gap-3 transition-colors duration-200 bg-white dark:bg-impulse-azul-900",
                minHeightClass,
                onClick && !disabled && "cursor-pointer hover:bg-impulse-neutro-50 dark:hover:bg-impulse-azul-800",
                disabled && "opacity-50 pointer-events-none cursor-not-allowed",
                divider && "border-b border-impulse-neutro-200 dark:border-impulse-neutro-700",
                className
            )}
            onClick={!disabled ? onClick : undefined}
            {...props}
        >
            {/* Leading Slot */}
            {resolvedLeading && (
                <div className={cn(
                    "shrink-0 flex items-center justify-center overflow-hidden text-impulse-neutro-600 dark:text-impulse-neutro-300",
                    leadingTypeStyles[leadingType]
                )}>
                    {resolvedLeading}
                </div>
            )}

            {/* Text Content */}
            <div className="flex-1 flex flex-col min-w-0 justify-center gap-1">
                <span className="font-semibold text-sm text-impulse-neutro-900 dark:text-impulse-neutro-100 truncate">
                    {headline}
                </span>

                {supportingText && (
                    <span
                        className={cn(
                            "text-impulse-neutro-600 dark:text-impulse-neutro-400 text-xs leading-snug",
                            lineClampClass
                        )}
                    >
                        {supportingText}
                    </span>
                )}
            </div>

            {/* Trailing Slot */}
            {trailing && (
                <div className="shrink-0 flex items-center justify-center text-impulse-neutro-500 dark:text-impulse-neutro-400">
                    {trailing}
                </div>
            )}
        </li>
    );
});

ListItem.displayName = 'ListItem';

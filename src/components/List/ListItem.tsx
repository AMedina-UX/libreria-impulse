import React from 'react';
import { cn } from '../../lib/utils';
import { Text } from '../Typography/Text';

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
     */
    leading?: React.ReactNode;
    /**
     * Type of leading element to adjust spacing and sizing.
     * @default 'icon'
     */
    leadingType?: ListItemLeadingType;
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

    const leadingTypeStyles = {
        monogram: "w-10 h-10",
        icon: "w-6 h-6",
        image: "w-14 h-14", // 56px
        video: "w-[100px] h-14", // 100px width, 56px height for 16:9ish thumbnail
    };

    return (
        <li
            ref={ref}
            className={cn(
                "relative flex items-center px-3 py-2 gap-3 transition-colors duration-200",
                minHeightClass,
                onClick && !disabled && "cursor-pointer hover:bg-impulse-neutro-50 dark:hover:bg-impulse-azul-800",
                disabled && "opacity-50 pointer-events-none cursor-not-allowed",
                divider && "border-b border-impulse-neutro-200 dark:border-impulse-neutro-700 last:border-b-0",
                className
            )}
            onClick={!disabled ? onClick : undefined}
            {...props}
        >
            {/* Leading Slot */}
            {leading && (
                <div className={cn(
                    "shrink-0 flex items-center justify-center overflow-hidden text-impulse-neutro-600 dark:text-impulse-neutro-300",
                    leadingTypeStyles[leadingType],
                    // Apply rounded styles based on type if needed, but usually the passed component handles it.
                    // "Video" thumbnails usually rectangular, others might be specific.
                )}>
                    {leading}
                </div>
            )}

            {/* Text Content */}
            <div className="flex-1 flex flex-col min-w-0 justify-center">
                <Text
                    className="font-bold text-impulse-neutro-900 dark:text-impulse-neutro-100 truncate"
                    variant="body"
                >
                    {headline}
                </Text>

                {supportingText && (
                    <Text
                        className={cn(
                            "text-impulse-neutro-600 dark:text-impulse-neutro-400 text-sm mt-0.5 leading-snug",
                            lines === 1 && "truncate",
                            lines > 1 && `line-clamp-${lines}`
                        )}
                        variant="caption"
                    >
                        {supportingText}
                    </Text>
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

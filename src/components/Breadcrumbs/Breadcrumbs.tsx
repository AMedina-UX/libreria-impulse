import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for merging tailwind classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    active?: boolean;
}

export interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    size?: 'sm' | 'lg';
    className?: string;
}

const ChevronRight = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
);

export const Breadcrumbs = ({
    items,
    separator,
    size = 'sm',
    className
}: BreadcrumbsProps) => {
    // Size variants
    const textSize = size === 'sm' ? 'text-xs' : 'text-sm'; // Based on image: S looks like ~16-18px, L looks larger ~24px
    const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
    const separatorSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

    // Default separator
    const SeparatorIcon = separator || <ChevronRight className={separatorSize} />;

    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const isActive = item.active ?? isLast;

                    // Styles matches image:
                    // Inactive: Grayish/Faded (e.g. text-impulse-neutro-100 or 500 equivalent)
                    // Active (Last item): Dark Blue (Light mode) / White or Light Gray (Dark mode)

                    // Light Mode:
                    // Inactive: text-impulse-neutro-200 (approx from image gray)
                    // Active: text-impulse-azul-100 (Blue from image)

                    // Dark Mode:
                    // Inactive: text-impulse-neutro-300 (Darker gray)
                    // Active: text-impulse-neutro-50 (White/Light gray)

                    const itemClasses = cn(
                        "flex items-center gap-2 font-medium transition-colors",
                        textSize,
                        isActive
                            ? "text-impulse-azul-300 dark:text-impulse-neutro-100"
                            : "text-impulse-neutro-100 hover:text-impulse-azul-100 dark:text-impulse-neutro-300 dark:hover:text-impulse-neutro-10"
                    );

                    const separatorClasses = cn(
                        "text-impulse-neutro-100 dark:text-impulse-neutro-300 mx-1",
                        separatorSize
                    );

                    return (
                        <li key={`${item.label}-${index}`} className="flex items-center">
                            {index > 0 && (
                                <span className={separatorClasses} aria-hidden="true">
                                    {SeparatorIcon}
                                </span>
                            )}

                            <span
                                className={itemClasses}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {item.icon && <span className={iconSize}>{item.icon}</span>}
                                <span>{item.label}</span>
                            </span>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

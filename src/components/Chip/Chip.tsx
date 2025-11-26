

export interface ChipProps {
    /**
     * The content of the chip
     */
    label: string;
    /**
     * Optional leading icon
     */
    icon?: React.ReactNode;
    /**
     * Visual variant of the chip
     */
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
    /**
     * Optional click handler
     */
    onClick?: () => void;
    /**
     * Optional delete handler
     */
    onDelete?: () => void;
    /**
     * Active state
     */
    active?: boolean;
}

export const Chip = ({
    label,
    icon,
    variant = 'default',
    onClick,
    onDelete,
    active = false,
}: ChipProps) => {
    const variants = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    };

    const activeStyles = active
        ? 'ring-2 ring-offset-2 ring-primary'
        : '';

    return (
        <div
            className={`
                inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${variants[variant]}
                ${activeStyles}
                ${onClick ? 'cursor-pointer' : ''}
            `}
            onClick={onClick}
        >
            {icon && <span className="mr-2 flex items-center">{icon}</span>}
            <span>{label}</span>
            {onDelete && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className={`ml-2 rounded-full p-0.5 hover:bg-black/10 focus:outline-none`}
                    aria-label="Delete"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
};

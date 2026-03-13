import React from 'react';
import { cn } from '../../lib/utils';

export type ChipColor = 'Primario' | 'Claro' | 'Oscuro';
export type ChipEstilo = 'Filled' | 'Outline';
export type ChipEstado = 'Default' | 'Hover' | 'Disable';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Text label shown inside the chip.
     */
    label?: string;
    /**
     * Color variant of the chip.
     * - `Primario`: Blue (#017CFF)
     * - `Claro`: Light blue (#E2EFFF / #9FCBFF)
     * - `Oscuro`: Dark navy (#041E45)
     * @default 'Primario'
     */
    color?: ChipColor;
    /**
     * Visual style — only `Filled` applies to all colors; `Outline` is only for Primario.
     * @default 'Filled'
     */
    estilo?: ChipEstilo;
    /**
     * Whether to show the check-circle icon on the left.
     * @default true
     */
    showIcon?: boolean;
    /**
     * Whether dark mode styles should be applied.
     * @default false
     */
    darkMode?: boolean;
    className?: string;
}

// Check-circle icon derived from Figma material icon
const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className={cn('shrink-0', className)}
        aria-hidden="true"
    >
        <path d="M8 1.333A6.667 6.667 0 1 0 8 14.667 6.667 6.667 0 0 0 8 1.333Zm-1.333 9.724L3.724 8.114l.943-.943 2 2 4.276-4.276.944.943-5.22 5.22Z" />
    </svg>
);

// ─── Token maps derived from Figma design ───────────────────────────────────

type ColorConfig = {
    bg: string;
    bgHover: string;
    border: string;
    borderHover: string;
    text: string;
    textHover: string;
    icon: string;
};

const colorMap: Record<ChipColor, Record<ChipEstilo, { light: ColorConfig; dark: ColorConfig }>> = {
    Primario: {
        Filled: {
            light: {
                bg: 'bg-impulse-celeste-100',              // #017CFF
                bgHover: 'hover:bg-impulse-azul-100',      // #0256B6
                border: '',
                borderHover: '',
                text: 'text-white',
                textHover: 'hover:text-white',
                icon: 'text-white',
            },
            dark: {
                bg: 'bg-impulse-celeste-100',
                bgHover: 'hover:bg-impulse-azul-100',
                border: '',
                borderHover: '',
                text: 'text-white',
                textHover: 'hover:text-white',
                icon: 'text-white',
            },
        },
        Outline: {
            light: {
                bg: 'bg-transparent',
                bgHover: 'hover:bg-transparent',
                border: 'border border-impulse-celeste-100',    // #017CFF
                borderHover: 'hover:border-impulse-azul-100',  // #0256B6
                text: 'text-impulse-celeste-100',
                textHover: 'hover:text-impulse-azul-100',
                icon: 'text-impulse-celeste-100',
            },
            dark: {
                bg: 'bg-transparent',
                bgHover: 'hover:bg-transparent',
                border: 'border border-impulse-celeste-100',
                borderHover: 'hover:border-impulse-celeste-80',  // #4C9BFF
                text: 'text-impulse-celeste-100',
                textHover: 'hover:text-impulse-celeste-80',
                icon: 'text-impulse-celeste-100',
            },
        },
    },
    Claro: {
        Filled: {
            light: {
                bg: 'bg-impulse-celeste-20',                // #E2EFFF
                bgHover: 'hover:bg-impulse-celeste-40',    // #A9D3FF
                border: '',
                borderHover: '',
                text: 'text-impulse-azul-300',             // #04255B
                textHover: 'hover:text-impulse-azul-300',
                icon: 'text-impulse-azul-300',
            },
            dark: {
                bg: 'bg-white',
                bgHover: 'hover:bg-impulse-celeste-50',    // #9FCBFF
                border: '',
                borderHover: '',
                text: 'text-impulse-azul-300',
                textHover: 'hover:text-impulse-azul-300',
                icon: 'text-impulse-azul-300',
            },
        },
        Outline: {
            // Outline doesn't apply to Claro — falls back to Filled
            light: {
                bg: 'bg-impulse-celeste-20',
                bgHover: 'hover:bg-impulse-celeste-40',
                border: '',
                borderHover: '',
                text: 'text-impulse-azul-300',
                textHover: 'hover:text-impulse-azul-300',
                icon: 'text-impulse-azul-300',
            },
            dark: {
                bg: 'bg-white',
                bgHover: 'hover:bg-impulse-celeste-50',
                border: '',
                borderHover: '',
                text: 'text-impulse-azul-300',
                textHover: 'hover:text-impulse-azul-300',
                icon: 'text-impulse-azul-300',
            },
        },
    },
    Oscuro: {
        Filled: {
            light: {
                // azul/500 = #041E45 (Figma: var(--color/impulse/azul/500))
                bg: 'bg-[#041E45]',
                bgHover: 'hover:bg-impulse-azul-200',      // #034291
                border: 'border border-white/20',
                borderHover: 'hover:border-white/20',
                text: 'text-white',
                textHover: 'hover:text-white',
                icon: 'text-white',
            },
            dark: {
                bg: 'bg-[#041E45]',
                bgHover: 'hover:bg-impulse-azul-200',
                border: 'border border-white/20',
                borderHover: 'hover:border-white/20',
                text: 'text-white',
                textHover: 'hover:text-white',
                icon: 'text-white',
            },
        },
        Outline: {
            // Outline doesn't apply to Oscuro — falls back to Filled
            light: {
                bg: 'bg-[#041E45]',
                bgHover: 'hover:bg-impulse-azul-200',
                border: 'border border-white/20',
                borderHover: '',
                text: 'text-white',
                textHover: 'hover:text-white',
                icon: 'text-white',
            },
            dark: {
                bg: 'bg-[#041E45]',
                bgHover: 'hover:bg-impulse-azul-200',
                border: 'border border-white/20',
                borderHover: '',
                text: 'text-white',
                textHover: 'hover:text-white',
                icon: 'text-white',
            },
        },
    },
};

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(({
    label = 'Label',
    color = 'Primario',
    estilo = 'Filled',
    showIcon = true,
    darkMode = false,
    disabled,
    className,
    ...props
}, ref) => {
    const config = colorMap[color][estilo][darkMode ? 'dark' : 'light'];

    return (
        <button
            ref={ref}
            type="button"
            disabled={disabled}
            className={cn(
                // Base layout — fixed height 20px, pill shape, Poppins SemiBold 12px
                'inline-flex items-center h-[20px] rounded-[20px] overflow-hidden',
                'font-semibold font-[Poppins] text-[12px] leading-[16px]',
                'transition-colors duration-150 cursor-pointer select-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-impulse-azul-60',
                // Colors
                config.bg,
                config.bgHover,
                config.border,
                config.borderHover,
                config.text,
                config.textHover,
                // Disabled
                disabled && 'opacity-50 pointer-events-none cursor-not-allowed',
                className
            )}
            {...props}
        >
            {/* Inner padding wrapper matching Figma state-layer: px-1 py-0.5 */}
            <span className="flex items-center px-[4px] py-[2px] gap-0">
                {/* Check-circle icon — 16px */}
                {showIcon && <CheckCircleIcon className={cn('size-[16px]', config.icon)} />}
                {/* Label — px-1 gap from icon */}
                <span className="px-[4px]">{label}</span>
            </span>
        </button>
    );
});

Chip.displayName = 'Chip';

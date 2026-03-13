import React from 'react';
import { cn } from '../../lib/utils';

export type AvatarEstilo = 'Monograma' | 'Imagen' | 'Icono';
export type AvatarTamano = 'sm' | 'md' | 'lg';

export interface AvatarProps {
    /**
     * Content type of the avatar.
     * - `Monograma`: Shows initials text
     * - `Imagen`: Shows a photo/image
     * - `Icono`: Shows a person silhouette icon
     * @default 'Monograma'
     */
    estilo?: AvatarEstilo;
    /**
     * Size of the avatar.
     * - `sm`: 24px
     * - `md`: 32px
     * - `lg`: 40px
     * @default 'lg'
     */
    tamano?: AvatarTamano;
    /**
     * Shows a green online-presence badge dot.
     * @default false
     */
    badge?: boolean;
    /**
     * Initials to display when `estilo` is `Monograma` (e.g. "UX").
     */
    initials?: string;
    /**
     * Image URL when `estilo` is `Imagen`.
     */
    src?: string;
    /**
     * Alt text for the image when `estilo` is `Imagen`.
     */
    alt?: string;
    className?: string;
}

// Figma-exact sizes per tamano
const sizeMap = {
    sm: {
        container: 'size-[24px]',
        fontSize: 'text-[12px] leading-[16px]',
        iconSize: 'size-[16px]',
        badgePos: 'bottom-[-2px] right-[-2px]',
    },
    md: {
        container: 'size-[32px]',
        fontSize: 'text-[14px] leading-[20px]',
        iconSize: 'size-[20px]',
        badgePos: 'bottom-0 right-0',
    },
    lg: {
        container: 'size-[40px]',
        fontSize: 'text-[16px] leading-[24px]',
        iconSize: 'size-[28px]',
        badgePos: 'bottom-[2px] right-[2px]',
    },
};

// Person icon SVG paths — derived from Figma Material Icons (person, filled)
const PersonIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
);

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({
    estilo = 'Monograma',
    tamano = 'lg',
    badge = false,
    initials = 'UX',
    src,
    alt = '',
    className,
}, ref) => {
    const sizes = sizeMap[tamano];

    return (
        <div
            ref={ref}
            className={cn(
                'relative rounded-full flex items-center justify-center shrink-0',
                sizes.container,
                // Background only for Monograma and Icono
                estilo !== 'Imagen' && 'bg-impulse-neutro-50',
                className
            )}
        >
            {/* ── Monograma ── */}
            {estilo === 'Monograma' && (
                <span
                    className={cn(
                        'font-semibold select-none text-impulse-neutro-300 font-[Poppins]',
                        sizes.fontSize
                    )}
                    aria-label={initials}
                >
                    {initials}
                </span>
            )}

            {/* ── Imagen ── wrap in its own clipping div so the badge is not clipped */}
            {estilo === 'Imagen' && (
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    <img
                        src={src}
                        alt={alt}
                        className="size-full object-cover pointer-events-none"
                    />
                </div>
            )}

            {/* ── Icono ── */}
            {estilo === 'Icono' && (
                <PersonIcon
                    className={cn('text-impulse-neutro-300', sizes.iconSize)}
                />
            )}

            {/* ── Badge (presence dot) ── */}
            {badge && (
                <span
                    className={cn(
                        'absolute size-[8px] rounded-full',
                        'bg-semantic-exito-100 border-2 border-white',
                        sizes.badgePos
                    )}
                    aria-label="En línea"
                />
            )}
        </div>
    );
});

Avatar.displayName = 'Avatar';

import * as React from "react";
import { cn } from "../../lib/utils";

export type TooltipPlacement = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content" | "title"> {
    /** El contenido principal del tooltip */
    content: React.ReactNode;
    /** Título destacado opcional para el tooltip */
    title?: React.ReactNode;
    /** Posición del tooltip relativo a su elemento padre */
    placement?: TooltipPlacement;
    /** Si es verdadero, el tooltip usa colores oscuros */
    darkMode?: boolean;
    /** Si debe mostrar la flecha apuntando al elemento (por defecto es true) */
    withArrow?: boolean;
    /** Ancho máximo del tooltip. Valor por defecto: "250px" */
    maxWidth?: number | string;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
    ({ className, content, title, placement = "top-center", darkMode = false, withArrow = true, maxWidth = "250px", children, ...props }, ref) => {

        // 1. Posicionamiento del contenedor del Tooltip
        const placementStyles: Record<TooltipPlacement, string> = {
            "top-left": "bottom-full left-0 mb-2",
            "top-center": "bottom-full left-1/2 -translate-x-1/2 mb-2",
            "top-right": "bottom-full right-0 mb-2",
            "bottom-left": "top-full left-0 mt-2",
            "bottom-center": "top-full left-1/2 -translate-x-1/2 mt-2",
            "bottom-right": "top-full right-0 mt-2",
        };

        // 2. Posicionamiento de la flecha relativo al contenedor del Tooltip
        const arrowRotatedStyles: Record<TooltipPlacement, string> = {
            "top-left": "bottom-[-4px] left-4",
            "top-center": "bottom-[-4px] left-1/2 -translate-x-1/2",
            "top-right": "bottom-[-4px] right-4",
            "bottom-left": "top-[-5px] left-4",
            "bottom-center": "top-[-5px] left-1/2 -translate-x-1/2",
            "bottom-right": "top-[-5px] right-4",
        };

        // 3. Colores de fondo y texto principales
        const variantStyles = {
            light: "bg-white text-impulse-neutro-900 border border-impulse-neutro-50 shadow-lg",
            dark: "bg-impulse-neutro-900 text-white shadow-lg",
        };

        // 4. Colores de la flecha (incluyendo bordes si es primary)
        // La flecha es un cuadrado de 10x10 rotado 45 grados.
        // Si el tooltip está arriba (top), la esquina visible es la inferior-derecha de la caja.
        // Si el tooltip está abajo (bottom), la esquina visible es la superior-izquierda de la caja.
        const arrowDirectionStyles = placement.startsWith("bottom") ? {
            light: "bg-white border-t border-l border-impulse-neutro-50",
            dark: "bg-impulse-neutro-900"
        } : {
            light: "bg-white border-b border-r border-impulse-neutro-50",
            dark: "bg-impulse-neutro-900"
        };


        return (
            <div
                className={cn("relative w-fit group inline-flex", className)}
                ref={ref}
                {...props}
            >
                {/* Elemento que dispara (gatilla) el Tooltip */}
                {children}

                {/* Contenedor del Tooltip que aparece on hover/focus */}
                <div
                    role="tooltip"
                    style={{ maxWidth }}
                    className={cn(
                        "absolute z-50 pointer-events-none invisible opacity-0 scale-95 transition-all duration-200 ease-out",
                        "group-hover:visible group-hover:opacity-100 group-hover:scale-100",
                        "group-focus-within:visible group-focus-within:opacity-100 group-focus-within:scale-100",
                        "px-3 py-2 rounded-lg text-sm w-max", // Tamaño de fuente y padding
                        darkMode ? variantStyles.dark : variantStyles.light,
                        placementStyles[placement]
                    )}
                >
                    {/* Renderización opcional del título */}
                    {title && (
                        <div className="font-semibold text-sm mb-1 leading-tight">
                            {title}
                        </div>
                    )}

                    {/* Contenido normal */}
                    <div className={cn(title ? "text-xs font-normal opacity-90" : "font-normal leading-tight")}>
                        {content}
                    </div>

                    {/* Flecha (Arrow) */}
                    {withArrow && (
                        <div
                            className={cn(
                                "absolute w-2.5 h-2.5 transform rotate-45 -z-10",
                                darkMode ? arrowDirectionStyles.dark : arrowDirectionStyles.light,
                                arrowRotatedStyles[placement]
                            )}
                        />
                    )}
                </div>
            </div>
        );
    }
);

Tooltip.displayName = "Tooltip";

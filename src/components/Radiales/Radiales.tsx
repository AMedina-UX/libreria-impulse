import React from 'react';
import { cn } from '../../lib/utils';

export type RadioSize = 's' | 'm' | 'l';
export type RadioColor = 'primary' | 'gray' | 'green' | 'yellow' | 'red';

// ─── RadioGroup Context ────────────────────────────────────────────────────────

interface RadioGroupContextValue {
    selectedValue: string | undefined;
    onSelect: (value: string) => void;
    name: string;
    disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

// ─── RadioGroup ────────────────────────────────────────────────────────────────

export interface RadioGroupProps {
    /** Valor seleccionado por defecto (sin control externo) */
    defaultValue?: string;
    /** Valor controlado externamente */
    value?: string;
    /** Callback cuando cambia la selección */
    onChange?: (value: string) => void;
    /** Nombre del grupo (HTML name attribute) */
    name?: string;
    /** Deshabilitar todo el grupo */
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const RadioGroup = ({
    defaultValue,
    value: valueProp,
    onChange,
    name,
    disabled,
    className,
    children,
}: RadioGroupProps) => {
    const generatedName = React.useId();
    const groupName = name || generatedName;

    const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
        valueProp !== undefined ? valueProp : defaultValue
    );

    // Sync con prop controlada
    React.useEffect(() => {
        if (valueProp !== undefined) setSelectedValue(valueProp);
    }, [valueProp]);

    const handleSelect = (val: string) => {
        setSelectedValue(val);
        onChange?.(val);
    };

    return (
        <RadioGroupContext.Provider
            value={{ selectedValue, onSelect: handleSelect, name: groupName, disabled }}
        >
            <div role="radiogroup" className={cn('flex flex-col', className)}>
                {children}
            </div>
        </RadioGroupContext.Provider>
    );
};

RadioGroup.displayName = 'RadioGroup';

// ─── Radiales ─────────────────────────────────────────────────────────────────

export interface RadialesProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
    /**
     * The size of the radio button
     * @default 'm'
     */
    size?: RadioSize;
    /**
     * The color theme of the radio button
     * @default 'primary'
     */
    color?: RadioColor;
    /**
     * The label text to display next to the radio button
     */
    label?: string;
    /**
     * Optional dark mode override
     */
    darkMode?: boolean;
}

export const Radiales = React.forwardRef<HTMLInputElement, RadialesProps>((
    {
        className,
        size = 'm',
        color = 'primary',
        label,
        disabled = false,
        darkMode = false,
        id,
        value,
        defaultChecked,
        checked: checkedProp,
        onChange,
        onClick,
        ...props
    },
    ref
) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    // Lee el contexto del grupo si existe
    const groupCtx = React.useContext(RadioGroupContext);
    const isInGroup = groupCtx !== null;

    // Estado independiente (solo cuando NO está en un grupo)
    const [soloChecked, setSoloChecked] = React.useState<boolean>(
        checkedProp !== undefined ? checkedProp : (defaultChecked ?? false)
    );

    React.useEffect(() => {
        if (!isInGroup && checkedProp !== undefined) setSoloChecked(checkedProp);
    }, [checkedProp, isInGroup]);

    // Determina si está checked:
    // - En grupo: compara el value prop con el valor seleccionado del grupo
    // - Suelto: usa el estado interno
    const isChecked = isInGroup
        ? groupCtx.selectedValue !== undefined && value !== undefined && groupCtx.selectedValue === String(value)
        : soloChecked;

    const isDisabled = disabled || (isInGroup ? groupCtx.disabled ?? false : false);

    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        if (!isDisabled) {
            if (isInGroup) {
                // Grupo: selecciona este valor (exclusividad manejada por el contexto)
                if (value !== undefined) groupCtx.onSelect(String(value));
            } else {
                // Suelto: toggle
                setSoloChecked((prev) => !prev);
            }
        }
        onClick?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    };

    const sizes = {
        s: {
            container: 'gap-2',
            icon: '!text-[20px]',
            label: 'text-sm',
            halo: 'w-[36px] h-[36px]',
        },
        m: {
            container: 'gap-2.5',
            icon: '!text-[24px]',
            label: 'text-sm',
            halo: 'w-[40px] h-[40px]',
        },
        l: {
            container: 'gap-3',
            icon: '!text-[28px]',
            label: 'text-sm',
            halo: 'w-[44px] h-[44px]',
        },
    };

    const colors = {
        primary: {
            unchecked: 'text-impulse-azul-60 dark:text-impulse-azul-60',
            checked: 'text-impulse-azul-60 dark:text-impulse-azul-60',
            hoverHalo: 'group-hover:bg-impulse-azul-60/10 dark:group-hover:bg-impulse-azul-60/20',
        },
        gray: {
            unchecked: 'text-impulse-neutro-300 dark:text-impulse-neutro-100',
            checked: 'text-impulse-neutro-900 dark:text-impulse-neutro-100',
            hoverHalo: 'group-hover:bg-impulse-neutro-400/10 dark:group-hover:bg-impulse-neutro-100/20',
        },
        green: {
            unchecked: 'text-semantic-exito-100 dark:text-semantic-exito-100',
            checked: 'text-semantic-exito-100 dark:text-semantic-exito-100',
            hoverHalo: 'group-hover:bg-semantic-exito-100/10 dark:group-hover:bg-semantic-exito-100/20',
        },
        yellow: {
            unchecked: 'text-semantic-advertencia-100 dark:text-semantic-advertencia-100',
            checked: 'text-semantic-advertencia-100 dark:text-semantic-advertencia-100',
            hoverHalo: 'group-hover:bg-semantic-advertencia-100/10 dark:group-hover:bg-semantic-advertencia-100/20',
        },
        red: {
            unchecked: 'text-semantic-error-100 dark:text-semantic-error-100',
            checked: 'text-semantic-error-100 dark:text-semantic-error-100',
            hoverHalo: 'group-hover:bg-semantic-error-100/10 dark:group-hover:bg-semantic-error-100/20',
        },
    };

    const currentSize = sizes[size];
    const currentColor = colors[color];

    return (
        <label
            htmlFor={inputId}
            className={cn(
                'inline-flex items-center group cursor-pointer relative',
                isDisabled && 'opacity-50 cursor-not-allowed',
                currentSize.container,
                className
            )}
        >
            <div className={cn(
                'relative flex items-center justify-center rounded-full transition-colors duration-200',
                darkMode && 'dark',
                currentSize.halo,
                !isDisabled && currentColor.hoverHalo
            )}>
                <input
                    type="radio"
                    id={inputId}
                    ref={ref}
                    name={isInGroup ? groupCtx.name : props.name}
                    value={value}
                    disabled={isDisabled}
                    checked={isChecked}
                    className="peer sr-only"
                    onClick={handleClick}
                    onChange={handleChange}
                    {...props}
                />

                {/* Unchecked Icon — visible by default, hidden when checked */}
                <span className={cn(
                    'material-icons-round select-none transition-transform duration-200',
                    currentSize.icon,
                    currentColor.unchecked,
                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                    'scale-100 opacity-100',
                    'peer-checked:scale-0 peer-checked:opacity-0',
                    isDisabled && 'text-impulse-neutro-200 dark:text-impulse-neutro-600'
                )}>
                    radio_button_unchecked
                </span>

                {/* Checked Icon — hidden by default, visible when checked */}
                <span className={cn(
                    'material-icons-round select-none transition-transform duration-200',
                    currentSize.icon,
                    currentColor.checked,
                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                    'scale-0 opacity-0',
                    'peer-checked:scale-100 peer-checked:opacity-100',
                    isDisabled && 'text-impulse-neutro-300 dark:text-impulse-neutro-500'
                )}>
                    radio_button_checked
                </span>

                {/* Focus ring overlay */}
                <div className="absolute inset-0 rounded-full pointer-events-none peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-impulse-azul-100" />
            </div>

            {label && (
                <span className={cn(
                    'font-normal text-impulse-neutro-900 select-none',
                    darkMode && 'dark:text-impulse-neutro-100',
                    isDisabled && 'text-impulse-neutro-400',
                    currentSize.label
                )}>
                    {label}
                </span>
            )}
        </label>
    );
});

Radiales.displayName = 'Radiales';

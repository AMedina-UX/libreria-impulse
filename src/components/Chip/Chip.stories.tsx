import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta = {
    title: 'Componentes/Chip',
    component: Chip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: { type: 'radio' },
            options: ['Primario', 'Claro', 'Oscuro'],
            description: 'Variante de color del chip',
            table: { defaultValue: { summary: 'Primario' } },
        },
        estilo: {
            control: { type: 'radio' },
            options: ['Filled', 'Outline'],
            description: 'Estilo visual (Outline solo aplica a color Primario)',
            table: { defaultValue: { summary: 'Filled' } },
        },
        darkMode: {
            control: { type: 'boolean' },
            description: 'Activa el modo oscuro',
            table: { defaultValue: { summary: 'false' } },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Deshabilita el chip (estado Disable)',
            table: { defaultValue: { summary: 'false' } },
        },
        showIcon: {
            control: { type: 'boolean' },
            description: 'Muestra u oculta el ícono de check-circle a la izquierda',
            table: { defaultValue: { summary: 'true' } },
        },
        label: {
            control: { type: 'text' },
            description: 'Texto del chip',
        },
    },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default interactive ─────────────────────────────────────────────────────
export const Default: Story = {
    args: {
        label: 'Label',
        color: 'Primario',
        estilo: 'Filled',
        darkMode: false,
        disabled: false,
    },
};

// ── Color variants ──────────────────────────────────────────────────────────
export const Primario: Story = {
    args: { label: 'Label', color: 'Primario', estilo: 'Filled' },
};

export const Claro: Story = {
    args: { label: 'Label', color: 'Claro', estilo: 'Filled' },
};

export const Oscuro: Story = {
    args: { label: 'Label', color: 'Oscuro', estilo: 'Filled' },
};

// ── Outline ─────────────────────────────────────────────────────────────────
export const Outline: Story = {
    args: { label: 'Label', color: 'Primario', estilo: 'Outline' },
};

// ── Disabled ────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    name: 'Estado Disable',
    args: { label: 'Label', color: 'Primario', estilo: 'Filled', disabled: true },
};

// ── Full color × style grid ──────────────────────────────────────────────────
export const TodasLasVariantes: Story = {
    name: 'Todas las Variantes',
    render: () => (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-20">Filled</span>
                <Chip label="Primario" color="Primario" estilo="Filled" />
                <Chip label="Claro" color="Claro" estilo="Filled" />
                <Chip label="Oscuro" color="Oscuro" estilo="Filled" />
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-20">Outline</span>
                <Chip label="Primario" color="Primario" estilo="Outline" />
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-20">Disabled</span>
                <Chip label="Primario" color="Primario" disabled />
                <Chip label="Claro" color="Claro" disabled />
                <Chip label="Oscuro" color="Oscuro" disabled />
                <Chip label="Outline" color="Primario" estilo="Outline" disabled />
            </div>
        </div>
    ),
};

// ── Dark mode grid ───────────────────────────────────────────────────────────
export const ModoOscuro: Story = {
    name: 'Modo Oscuro',
    decorators: [
        (Story) => (
            <div className="bg-impulse-azul-900 p-8 rounded-xl dark">
                <Story />
            </div>
        ),
    ],
    render: () => (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <span className="text-xs text-impulse-neutro-300 w-20">Filled</span>
                <Chip label="Primario" color="Primario" estilo="Filled" darkMode />
                <Chip label="Claro" color="Claro" estilo="Filled" darkMode />
                <Chip label="Oscuro" color="Oscuro" estilo="Filled" darkMode />
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs text-impulse-neutro-300 w-20">Outline</span>
                <Chip label="Primario" color="Primario" estilo="Outline" darkMode />
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xs text-impulse-neutro-300 w-20">Disabled</span>
                <Chip label="Primario" color="Primario" disabled darkMode />
                <Chip label="Claro" color="Claro" disabled darkMode />
                <Chip label="Oscuro" color="Oscuro" disabled darkMode />
            </div>
        </div>
    ),
};

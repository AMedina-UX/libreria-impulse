import type { Meta, StoryObj } from '@storybook/react';
import { Radiales, RadioGroup, type RadioColor } from './Radiales';

const meta = {
    title: 'Forms/Radiales',
    component: Radiales,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'radio' },
            options: ['s', 'm', 'l'],
            description: 'Tamaño del radio button',
        },
        color: {
            control: { type: 'select' },
            options: ['primary', 'gray', 'green', 'yellow', 'red'],
            description: 'Color del radio button',
        },
        disabled: {
            control: 'boolean',
            description: 'Estado deshabilitado',
        },
        checked: {
            control: 'boolean',
            description: 'Si el radio está seleccionado',
        },
        darkMode: {
            control: 'boolean',
            description: 'Forzar modo oscuro',
        },
        label: {
            control: 'text',
            description: 'Texto del label',
        },
    },
} satisfies Meta<typeof Radiales>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Opción seleccionada',
        defaultChecked: true,
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <Radiales size="s" label="Small" defaultChecked />
                <Radiales size="m" label="Medium" defaultChecked />
                <Radiales size="l" label="Large" defaultChecked />
            </div>
            <div className="flex items-center gap-4">
                <Radiales size="s" label="Small" />
                <Radiales size="m" label="Medium" />
                <Radiales size="l" label="Large" />
            </div>
        </div>
    ),
};

export const Colors: Story = {
    render: () => {
        const colors: RadioColor[] = ['primary', 'gray', 'green', 'yellow', 'red'];
        return (
            <div className="grid grid-cols-5 gap-8">
                {colors.map((c) => (
                    <div key={c} className="flex flex-col items-center gap-4">
                        <span className="text-xs font-mono uppercase text-gray-500">{c}</span>
                        <Radiales color={c} defaultChecked />
                        <Radiales color={c} />
                        <Radiales color={c} disabled defaultChecked />
                        <Radiales color={c} disabled />
                    </div>
                ))}
            </div>
        );
    },
};

export const States: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Radiales label="Sin seleccionar" />
            <Radiales label="Seleccionado" defaultChecked />
            <Radiales label="Deshabilitado sin seleccionar" disabled />
            <Radiales label="Deshabilitado seleccionado" disabled defaultChecked />
        </div>
    ),
};

export const GrupoRadial: Story = {
    name: 'Radio Group',
    render: () => (
        <RadioGroup defaultValue="a" className="gap-3">
            <span className="text-sm font-semibold text-impulse-neutro-900 mb-1">
                Elige una opción:
            </span>
            <Radiales label="Opción A" value="a" />
            <Radiales label="Opción B" value="b" />
            <Radiales label="Opción C" value="c" />
            <Radiales label="Opción D (deshabilitada)" value="d" disabled />
        </RadioGroup>
    ),
};

export const DarkMode: Story = {
    parameters: {
        backgrounds: { default: 'dark' },
    },
    decorators: [
        (Story) => (
            <div className="bg-impulse-azul-900 p-8 rounded-lg dark">
                <Story />
            </div>
        ),
    ],
    render: () => (
        <div className="flex flex-col gap-4 text-white">
            <div className="flex items-center gap-4">
                <Radiales label="Default seleccionado" color="primary" defaultChecked />
                <Radiales label="Sin seleccionar" color="primary" />
            </div>
            <div className="flex items-center gap-4">
                <Radiales label="Verde" color="green" defaultChecked />
                <Radiales label="Rojo" color="red" defaultChecked />
            </div>
            <div className="flex items-center gap-4">
                <Radiales label="Deshabilitado" disabled />
                <Radiales label="Deshabilitado seleccionado" disabled defaultChecked />
            </div>
        </div>
    ),
};

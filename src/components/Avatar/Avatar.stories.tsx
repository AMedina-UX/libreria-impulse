import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
    title: 'Componentes/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        estilo: {
            control: { type: 'radio' },
            options: ['Monograma', 'Imagen', 'Icono'],
            description: 'Tipo de contenido del avatar',
            table: {
                defaultValue: { summary: 'Monograma' },
            },
        },
        tamano: {
            control: { type: 'radio' },
            options: ['sm', 'md', 'lg'],
            description: 'Tamaño del avatar (sm=24px, md=32px, lg=40px)',
            table: {
                defaultValue: { summary: 'lg' },
            },
        },
        badge: {
            control: { type: 'boolean' },
            description: 'Muestra un indicador de presencia en verde',
            table: {
                defaultValue: { summary: 'false' },
            },
        },
        initials: {
            control: { type: 'text' },
            description: 'Iniciales a mostrar cuando estilo=Monograma',
            if: { arg: 'estilo', eq: 'Monograma' },
        },
        src: {
            control: { type: 'text' },
            description: 'URL de la imagen cuando estilo=Imagen',
            if: { arg: 'estilo', eq: 'Imagen' },
        },
        alt: {
            control: { type: 'text' },
            description: 'Texto alternativo de la imagen',
            if: { arg: 'estilo', eq: 'Imagen' },
        },
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default interactive story ──────────────────────────────────────
export const Default: Story = {
    args: {
        estilo: 'Monograma',
        tamano: 'lg',
        badge: false,
        initials: 'UX',
        src: 'https://i.pravatar.cc/300',
        alt: 'Avatar de usuario',
    },
};

// ── Estilo variants ────────────────────────────────────────────────
export const Monograma: Story = {
    args: {
        estilo: 'Monograma',
        tamano: 'lg',
        badge: false,
        initials: 'UX',
    },
};

export const Imagen: Story = {
    args: {
        estilo: 'Imagen',
        tamano: 'lg',
        badge: false,
        src: 'https://i.pravatar.cc/300',
        alt: 'Avatar de usuario',
    },
};

export const Icono: Story = {
    args: {
        estilo: 'Icono',
        tamano: 'lg',
        badge: false,
    },
};

// ── Badge / Presencia ──────────────────────────────────────────────
export const WithBadge: Story = {
    name: 'Con Badge de Presencia',
    args: {
        estilo: 'Monograma',
        tamano: 'lg',
        badge: true,
        initials: 'UX',
    },
};

// ── All sizes ──────────────────────────────────────────────────────
export const AllSizes: Story = {
    name: 'Todos los Tamaños',
    render: () => (
        <div className="flex items-center gap-4">
            <Avatar estilo="Monograma" tamano="sm" initials="UX" />
            <Avatar estilo="Monograma" tamano="md" initials="UX" />
            <Avatar estilo="Monograma" tamano="lg" initials="UX" />
        </div>
    ),
};

// ── All estilos grid ───────────────────────────────────────────────
export const AllEstilos: Story = {
    name: 'Todos los Estilos (con y sin Badge)',
    render: () => (
        <div className="flex flex-col gap-6">
            {(['sm', 'md', 'lg'] as const).map((tamano) => (
                <div key={tamano} className="flex items-center gap-6">
                    <span className="text-xs text-gray-400 w-6">{tamano}</span>
                    {/* Monograma */}
                    <Avatar estilo="Monograma" tamano={tamano} initials="UX" />
                    <Avatar estilo="Monograma" tamano={tamano} initials="UX" badge />
                    {/* Icono */}
                    <Avatar estilo="Icono" tamano={tamano} />
                    <Avatar estilo="Icono" tamano={tamano} badge />
                    {/* Imagen */}
                    <Avatar estilo="Imagen" tamano={tamano} src="https://i.pravatar.cc/300" alt="Avatar" />
                    <Avatar estilo="Imagen" tamano={tamano} src="https://i.pravatar.cc/300" alt="Avatar" badge />
                </div>
            ))}
        </div>
    ),
};

// ── Dark Mode ─────────────────────────────────────────────────────
export const DarkMode: Story = {
    name: 'Modo Oscuro',
    decorators: [
        (Story) => (
            <div className="bg-impulse-azul-900 p-8 rounded-xl dark">
                <Story />
            </div>
        ),
    ],
    render: () => (
        <div className="flex items-center gap-4">
            <Avatar estilo="Monograma" tamano="lg" initials="UX" />
            <Avatar estilo="Icono" tamano="lg" />
            <Avatar estilo="Imagen" tamano="lg" src="https://i.pravatar.cc/300" alt="Avatar" />
            <Avatar estilo="Monograma" tamano="lg" initials="UX" badge />
        </div>
    ),
};

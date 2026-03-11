import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta = {
    title: 'Componentes/Tooltip',
    component: Tooltip,
    decorators: [
        (Story) => (
            <div style={{ padding: '4em' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    // Adding argTypes to allow storybook users to modify the base args dynamically
    argTypes: {
        placement: {
            control: 'select',
            options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
            description: 'Posición del tooltip relativo al elemento objetivo',
            table: {
                defaultValue: { summary: 'top-center' },
            }
        },
        darkMode: {
            control: 'boolean',
            description: 'Activa o desactiva el modo oscuro del tooltip (por defecto es falso/claro)',
            table: {
                defaultValue: { summary: 'false' },
            }
        },
        withArrow: {
            control: 'boolean',
            description: 'Muestra u oculta la pequeña flecha indicadora',
            table: {
                defaultValue: { summary: 'true' },
            }
        },
        maxWidth: {
            control: 'text',
            description: 'Ancho máximo del tooltip. Acepta cualquier valor CSS (ej. "250px", "10rem", 300)',
            table: {
                defaultValue: { summary: '250px' },
            }
        },
        content: {
            control: 'text',
            description: 'Contenido principal del tooltip'
        },
        title: {
            control: 'text',
            description: 'Opcional: Título destacado para el tooltip'
        }
    }
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        title: 'Título Opcional',
        content: 'Este es el contenido explicativo del Tooltip. Puedes modificar los valores en los controles.',
        placement: 'top-center',
        darkMode: false,
        withArrow: true,
        maxWidth: '250px',
    },
    render: (args) => (
        <Tooltip {...args}>
            <Button variant="outline" size="md">Pasa el ratón aquí</Button>
        </Tooltip>
    ),
};

export const PosicionesSuperiores: Story = {
    args: {
        content: '',
    },
    render: () => (
        <div className="flex gap-16 w-full justify-center mt-12 mb-12 items-center">
            <Tooltip title="Top Left" content="Alineado a la izquierda. La flecha sale de la esquina. Y el contenedor sigue arriba." placement="top-left" darkMode>
                <Button variant="outline">Top Left</Button>
            </Tooltip>

            <Tooltip title="Top Center" content="Totalmente centrado" placement="top-center">
                <Button variant="outline">Top Center</Button>
            </Tooltip>

            <Tooltip title="Top Right" content="Alineado a la derecha. La flecha sale de la esquina derecha." placement="top-right" darkMode>
                <Button variant="outline">Top Right</Button>
            </Tooltip>
        </div>
    ),
    argTypes: {
        placement: { table: { disable: true } },
        darkMode: { table: { disable: true } },
        title: { table: { disable: true } },
        content: { table: { disable: true } },
    }
};

export const PosicionesInferiores: Story = {
    args: {
        content: '',
    },
    render: () => (
        <div className="flex gap-16 w-full justify-center mt-12 mb-12 items-center">
            <Tooltip title="Bottom Left" content="Alinea a la izquierda por debajo" placement="bottom-left">
                <Button variant="outline">Bottom Left</Button>
            </Tooltip>

            <Tooltip title="Bottom Center" content="Totalmente centrado inferior" placement="bottom-center" darkMode>
                <Button variant="outline">Bottom Center</Button>
            </Tooltip>

            <Tooltip title="Bottom Right" content="Alinea a la derecha inferior" placement="bottom-right">
                <Button variant="outline">Bottom Right</Button>
            </Tooltip>
        </div>
    ),
    argTypes: {
        placement: { table: { disable: true } },
        darkMode: { table: { disable: true } },
        title: { table: { disable: true } },
        content: { table: { disable: true } },
    }
};

export const ModosDeColor: Story = {
    args: {
        content: '',
    },
    render: () => (
        <div className="flex gap-16 p-12 bg-impulse-neutro-50 dark:bg-impulse-azul-900 rounded-lg justify-center mt-8">
            <Tooltip
                title="Modo Claro"
                content="Modo por defecto (off) con borde sutil y fondo blanco"
                placement="top-center"
            >
                <Button variant="filled" color="primary">Fondo Claro</Button>
            </Tooltip>

            <Tooltip
                title="Modo Oscuro"
                content="Modo oscuro (ON) con fondo Neutro 900"
                placement="top-center"
                darkMode
            >
                <Button variant="outline">Fondo Oscuro</Button>
            </Tooltip>
        </div>
    ),
    argTypes: {
        placement: { table: { disable: true } },
        darkMode: { table: { disable: true } },
        title: { table: { disable: true } },
        content: { table: { disable: true } },
    }
};

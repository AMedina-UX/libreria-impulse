import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
    title: 'Componentes/Alert',
    component: Alert,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'info', 'warning', 'destructive', 'success'],
            description: 'The visual variant of the alert.',
        },
        title: {
            control: 'text',
        },
        showActions: {
            control: 'boolean',
            description: 'Toggle visibility of the action buttons.',
            defaultValue: true,
        },
        actionsLayout: {
            control: { type: 'select' },
            options: ['bot-left', 'bot-right', 'right', 'responsive'],
            description: 'Layout position of the action buttons.',
            defaultValue: 'bot-left',
        },
        // Flat props for Storybook controls for actions
        primaryActionLabel: { control: 'text', name: 'Primary Action Label' },
        primaryActionVariant: { control: { type: 'select' }, options: ['filled', 'outline', 'link'], name: 'Primary Action Variant' },
        secondaryActionLabel: { control: 'text', name: 'Secondary Action Label' },
        secondaryActionVariant: { control: { type: 'select' }, options: ['filled', 'outline', 'link'], name: 'Secondary Action Variant' },

        // Hide actual object props in Storybook UI to prevent confusion
        primaryAction: { table: { disable: true } },
        secondaryAction: { table: { disable: true } },
    },
    render: (args: any) => {
        const primaryAction = args.primaryActionLabel ? {
            label: args.primaryActionLabel,
            variant: args.primaryActionVariant,
            onClick: () => alert('Primary action clicked'),
        } : undefined;

        const secondaryAction = args.secondaryActionLabel ? {
            label: args.secondaryActionLabel,
            variant: args.secondaryActionVariant,
            onClick: () => alert('Secondary action clicked'),
        } : undefined;

        return (
            <Alert
                {...args}
                primaryAction={primaryAction}
                secondaryAction={secondaryAction}
                actionsLayout={args.actionsLayout}
            />
        );
    }
} as Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
    args: {
        variant: 'info',
        title: 'Información',
        children: 'Por razones de seguridad, sus operaciones serán bloqueadas por mientras se realiza la compra del add-on mediante nuestro checkout.',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        title: 'Alerta',
        children: 'Por razones de seguridad, tu contraseña ya no podrá ser vista en esta pantalla.',
    },
};

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        title: 'Peligro',
        children: 'Por razones de seguridad, tu contraseña ya no podrá ser vista en esta pantalla.',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        title: 'Éxito',
        children: 'Su operación se ha completado con éxito. Ahora puede continuar utilizando el sistema.',
    },
};

export const CustomIcon: Story = {
    args: {
        variant: 'info',
        icon: <span>🚀</span>,
        title: 'Custom Icon',
        children: 'This is an alert with a custom icon provided as a prop.',
    },
};

export const WithActions: Story = {
    args: {
        variant: 'info',
        title: 'Actualización disponible',
        children: 'Hay una nueva versión del sistema disponible para descargar.',
        showActions: true,
        primaryActionLabel: 'Actualizar ahora',
        primaryActionVariant: 'filled',
        secondaryActionLabel: 'Más tarde',
        secondaryActionVariant: 'outline',
    },
};

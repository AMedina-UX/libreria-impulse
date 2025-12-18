import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
    title: 'Componentes/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        state: {
            control: 'select',
            options: ['default', 'error', 'disabled'],
        },
        showLabel: { control: 'boolean' },
        showStartIcon: { control: 'boolean' },
        showEndIcon: { control: 'boolean' },
        error: { control: 'boolean' },
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        label: 'Label',
        showLabel: true,
        placeholder: 'item',
        state: 'default',
        error: false,
        size: 'md',
        fullWidth: true,
        startIcon: 'search',
        showStartIcon: true,
        endIcon: 'expand_more',
        showEndIcon: true,
        helperText: 'Helper text',
    },
    render: (args) => <div className="w-[300px]"><Input {...args} /></div>
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4 w-[300px]">
            <Input label="Size S" placeholder="Small input" size="sm" startIcon="search" />
            <Input label="Size M" placeholder="Medium input" size="md" startIcon="search" />
            <Input label="Size L" placeholder="Large input" size="lg" startIcon="search" />
        </div>
    )
};

export const States: Story = {
    render: () => (
        <div className="flex flex-col gap-4 w-[300px]">
            <Input label="Default" placeholder="Default state" />
            <Input label="Active (Focus me)" placeholder="Active state" />
            <Input label="Disabled" placeholder="Disabled state" state="disabled" value="Disabled Value" />
            <Input label="Error (Prop)" placeholder="Error state" error={true} helperText="Mensaje de error" startIcon="search" />
            <Input label="Error (State)" placeholder="Error state" state="error" helperText="Mensaje de error" startIcon="search" />
        </div>
    )
};

export const WithIcons: Story = {
    render: () => (
        <div className="flex flex-col gap-4 w-[300px]">
            <Input label="Start Icon" placeholder="Search..." startIcon="search" showStartIcon={true} />
            <Input label="End Icon" placeholder="Select item" endIcon="expand_more" showEndIcon={true} />
            <Input label="Both Icons" placeholder="Search item" startIcon="search" endIcon="expand_more" />
            <Input label="Hidden Icons" placeholder="Icons hidden" startIcon="search" showStartIcon={false} endIcon="expand_more" showEndIcon={false} />
        </div>
    )
};

export const DarkMode: Story = {
    render: () => (
        <div className="dark bg-impulse-azul-900 p-6 rounded-xl w-[350px]">
            <h3 className="text-white mb-4">Dark Mode</h3>
            <div className="flex flex-col gap-4">
                <Input label="Default" placeholder="Default state" />
                <Input label="Active (Focus me)" placeholder="Active state" />
                <Input label="Disabled" placeholder="Disabled state" state="disabled" value="Disabled Value" />
                <Input label="Error" placeholder="Error state" state="error" helperText="Mensaje de error" startIcon="search" />
            </div>
        </div>
    )
};

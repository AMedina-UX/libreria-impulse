import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
    title: 'Componentes/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['filled', 'outline', 'ghost', 'link'],
        },
        color: {
            control: 'select',
            options: ['primary', 'light', 'accent', 'success', 'warning', 'destructive'],
        },
        size: {
            control: 'radio',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        loading: {
            control: 'boolean',
        },
        startIcon: {
            control: 'text',
        },
        endIcon: {
            control: 'text',
        },
        showStartIcon: {
            control: 'boolean',
        },
        showEndIcon: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Button',
        color: 'primary',
        variant: 'filled',
        size: 'md',
        startIcon: 'check',
        endIcon: 'arrow_forward',
        showStartIcon: true,
        showEndIcon: true,
    },
};

export const Loading: Story = {
    args: {
        children: 'Loading',
        loading: true,
    },
};

export const AllSizes: Story = {
    render: (args) => (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center items-end">
                <Button {...args} size="xs">XS Button</Button>
                <Button {...args} size="sm">SM Button</Button>
                <Button {...args} size="md">MD Button</Button>
                <Button {...args} size="lg">LG Button</Button>
                <Button {...args} size="xl">XL Button</Button>
            </div>
        </div>
    ),
    args: {
        color: 'primary',
        variant: 'filled',
        children: 'Button',
        showStartIcon: true,
        showEndIcon: true,
    },
};

export const AllVariants: Story = {
    render: (args) => (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
                <Button {...args} variant="filled">Filled</Button>
                <Button {...args} variant="outline">Outline</Button>
                <Button {...args} variant="ghost">Ghost</Button>
                <Button {...args} variant="link">Link</Button>
            </div>
        </div>
    ),
    args: {
        color: 'primary',
        children: 'Button',
        size: 'md',
        showStartIcon: true,
        showEndIcon: true,
    },
};

export const AllColors: Story = {
    render: (args) => (
        <div className="flex flex-col gap-4">
            {['primary', 'light', 'accent', 'success', 'warning', 'destructive'].map((color) => (
                <div key={color} className="flex gap-4 items-center">
                    <div className="w-24 text-sm font-medium text-gray-500 capitalize">{color}</div>
                    <Button {...args} color={color as any} variant="filled">Filled</Button>
                    <Button {...args} color={color as any} variant="outline">Outline</Button>
                    <Button {...args} color={color as any} variant="ghost">Ghost</Button>
                    <Button {...args} color={color as any} variant="link">Link</Button>
                </div>
            ))}
        </div>
    ),
    args: {
        children: 'Button',
        size: 'md',
        showStartIcon: true,
        showEndIcon: true,
    },
};

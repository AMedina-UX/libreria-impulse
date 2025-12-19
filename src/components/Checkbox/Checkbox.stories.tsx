import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, type CheckboxColor } from './Checkbox';

const meta = {
    title: 'Forms/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'radio' },
            options: ['s', 'm', 'l'],
            description: 'Size of the checkbox',
        },
        color: {
            control: { type: 'select' },
            options: ['primary', 'gray', 'green', 'yellow', 'red'],
            description: 'Color theme of the checkbox',
        },
        disabled: {
            control: 'boolean',
        },
        checked: {
            control: 'boolean',
            description: 'Whether the checkbox is checked',
        },
        label: {
            control: 'text',
        }
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Accept terms and conditions',
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <Checkbox size="s" label="Small" defaultChecked />
                <Checkbox size="m" label="Medium" defaultChecked />
                <Checkbox size="l" label="Large" defaultChecked />
            </div>
            <div className="flex items-center gap-4">
                <Checkbox size="s" label="Small" />
                <Checkbox size="m" label="Medium" />
                <Checkbox size="l" label="Large" />
            </div>
        </div>
    ),
};

export const Colors: Story = {
    render: () => {
        const colors: CheckboxColor[] = ['primary', 'gray', 'green', 'yellow', 'red'];
        return (
            <div className="grid grid-cols-5 gap-8">
                {colors.map(c => (
                    <div key={c} className="flex flex-col items-center gap-4">
                        <span className="text-xs font-mono uppercase text-gray-500">{c}</span>
                        <Checkbox color={c} defaultChecked />
                        <Checkbox color={c} />
                        <Checkbox color={c} disabled defaultChecked />
                        <Checkbox color={c} disabled />
                    </div>
                ))}
            </div>
        );
    }
};

export const States: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Disabled Unchecked" disabled />
            <Checkbox label="Disabled Checked" disabled defaultChecked />
        </div>
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
                <Checkbox label="Dark Mode Checkbox" color="primary" defaultChecked />
                <Checkbox label="Unchecked" color="primary" />
            </div>
            <div className="flex items-center gap-4">
                <Checkbox label="Success" color="green" defaultChecked />
                <Checkbox label="Error" color="red" defaultChecked />
            </div>
            <div className="flex items-center gap-4">
                <Checkbox label="Disabled" disabled />
                <Checkbox label="Disabled Checked" disabled defaultChecked />
            </div>
        </div>
    ),
};

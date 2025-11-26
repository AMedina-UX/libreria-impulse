import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta = {
    title: 'Example/Chip',
    component: Chip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Chip',
    },
};

export const Active: Story = {
    args: {
        label: 'Active Chip',
        active: true,
    },
};

export const Clickable: Story = {
    args: {
        label: 'Click Me',
        onClick: () => alert('Clicked!'),
    },
};

export const WithIcon: Story = {
    args: {
        label: 'With Icon',
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        ),
    },
};

export const Outline: Story = {
    args: {
        label: 'Outline',
        variant: 'outline',
    },
};

export const Destructive: Story = {
    args: {
        label: 'Destructive',
        variant: 'destructive',
    },
};

export const Deletable: Story = {
    args: {
        label: 'Delete Me',
        onDelete: () => alert('Deleted!'),
    },
};

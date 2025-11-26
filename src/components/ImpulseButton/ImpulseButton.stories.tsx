import type { Meta, StoryObj } from '@storybook/react';
import { ImpulseButton } from './ImpulseButton';

const meta = {
    title: 'Impulse/ImpulseButton',
    component: ImpulseButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ImpulseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Get Started',
    },
};

export const FullWidth: Story = {
    args: {
        children: 'Subscribe Now',
        fullWidth: true,
    },
    parameters: {
        layout: 'padded',
    },
};

export const WithIcon: Story = {
    args: {
        children: (
            <>
                <span>Explore</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </>
        ),
    },
};

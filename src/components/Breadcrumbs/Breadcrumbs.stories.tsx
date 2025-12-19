import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
    title: 'Navegación/Breadcrumbs',
    component: Breadcrumbs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'radio' },
            options: ['sm', 'lg'],
            description: 'Size of the breadcrumbs',
        },
    },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile', active: true },
];

export const Default: Story = {
    args: {
        items: defaultItems,
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        items: defaultItems,
        size: 'lg',
    },
};

export const WithIcons: Story = {
    args: {
        size: 'sm',
        items: [
            {
                label: 'Home',
                href: '/',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                )
            },
            {
                label: 'Documents',
                href: '/documents',
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" x2="8" y1="13" y2="13" />
                        <line x1="16" x2="8" y1="17" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                )
            },
            { label: 'Project A', active: true },
        ],
    },
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
    args: {
        items: defaultItems,
        size: 'sm',
    },
};

export const CustomSeparator: Story = {
    args: {
        items: defaultItems,
        size: 'sm',
        separator: (
            <span className="mx-2 text-impulse-neutro-100">/</span>
        ),
    },
};

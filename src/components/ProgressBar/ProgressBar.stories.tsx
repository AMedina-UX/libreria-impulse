import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, ProgressCircular } from './ProgressBar';

type StoryProps = React.ComponentProps<typeof ProgressBar> & {
    /** Tipo de barra de progreso */
    variant?: 'linear' | 'radial';
};

const meta = {
    title: 'Componentes/ProgressBar',
    component: ProgressBar,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    // Adding argTypes to allow storybook users to modify the base args dynamically
    argTypes: {
        variant: {
            control: 'radio',
            options: ['linear', 'radial'],
            description: 'Tipo de barra de progreso',
            table: {
                defaultValue: { summary: 'linear' },
            }
        },
        value: {
            control: { type: 'range', min: 0, max: 100, step: 1 },
            description: 'Current progress value (0-100)'
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Height variant of the progress bar (Linear only)'
        }
    }
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
    args: {
        variant: 'linear',
        value: 40,
        size: 'md',
    },
    render: ({ variant, value, size, ...args }) => (
        <div className="flex w-full max-w-md p-8 bg-white dark:bg-impulse-azul-900 rounded justify-center items-center">
            {variant === 'radial' ? (
                <ProgressCircular value={value} />
            ) : (
                <div className="w-full">
                    <ProgressBar value={value} size={size as "sm" | "md" | "lg"} {...args} />
                </div>
            )}
        </div>
    )
};

// Basic interactive linear stories
export const LinearVariants: Story = {
    args: {
        value: 40,
    },
    render: (args) => (
        <div className="flex flex-col gap-8 w-full max-w-md p-8 bg-white dark:bg-impulse-azul-900 rounded">
            <div>
                <h4 className="text-xs mb-2 text-impulse-neutro-500 uppercase">SM</h4>
                <ProgressBar value={args.value} size="sm" />
            </div>

            <div>
                <h4 className="text-xs mb-2 text-impulse-neutro-500 uppercase">MD</h4>
                <ProgressBar value={args.value} size="md" />
            </div>

            <div>
                <h4 className="text-xs mb-2 text-impulse-neutro-500 uppercase">LG</h4>
                <ProgressBar value={args.value} size="lg" />
            </div>
        </div>
    ),
    argTypes: {
        variant: { table: { disable: true } },
        size: { table: { disable: true } }
    }
};

export const CircularVariants: Story = {
    args: {
        value: 25,
    },
    render: (args) => (
        <div className="flex items-center gap-8 w-full max-w-md p-8 bg-white dark:bg-impulse-azul-900 rounded">
            <div className="flex flex-col items-center gap-2">
                <h4 className="text-xs text-impulse-neutro-500 uppercase">25% Fixed</h4>
                <ProgressCircular value={25} />
            </div>
            <div className="flex flex-col items-center gap-2">
                <h4 className="text-xs text-impulse-neutro-500 uppercase">50% Fixed</h4>
                <ProgressCircular value={50} />
            </div>
            <div className="flex flex-col items-center gap-2">
                <h4 className="text-xs text-impulse-neutro-500 uppercase">75% Fixed</h4>
                <ProgressCircular value={75} />
            </div>
            <div className="flex flex-col items-center gap-2">
                <h4 className="text-xs text-impulse-neutro-500 uppercase">100% Fixed</h4>
                <ProgressCircular value={100} />
            </div>
            <div className="flex flex-col items-center gap-2">
                <h4 className="text-xs text-impulse-neutro-500 uppercase">Dynamic</h4>
                <ProgressCircular value={args.value} />
            </div>
        </div>
    ),
    argTypes: {
        variant: { table: { disable: true } },
        size: { table: { disable: true } }
    }
};
